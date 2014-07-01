import json, re, sys

solr_category = "cloud"

tidict = {
	"ACLs": {
		"add":"addUser",
		"remove":"removeUser",
		"check":"checkUser"
	},
	"Emails" : {
		"email_from_template":"send"
	},
	"KeyValues": {
		"incrby":"increment"
	},
	"Messages": {
		"delete_thread":"removeThread"
	},
	"PushNotifications" : {
		"channels_query":"queryChannels",
		"channels_show":"showChannels",
		"reset_badge_put":"resetBadge"
	},
	"SocialIntegrations": {
		"facebook_search_friends":"searchFacebookFriends"
	}
}

# Helper function to convert unicode string to ASCII
def u2a(str):
	if isinstance(str, unicode):
		return str.encode('ascii', 'ignore')
	else:
		return str

# Helper to strip HTML tags and replace new lines with spaces
from HTMLParser import HTMLParser

class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    t = s.get_data()
    t = " ".join(t.split("\n"))
    return t

def dict_has_non_empty_member(d, member_name):
        return member_name in d and d[member_name] is not None and len(d[member_name]) > 0

def parse_params(params):
	new_params = ""
	for elem in params:
		new_elem = " * <li>"
		new_elem += elem["name"]
		if "type" in elem:
			new_elem += " (" + convert_to_android_type(elem["type"]) + "): "
		else:
			new_elem += ": "
		new_elem += strip_tags(shorten_desc(elem["doc"]))
		if "optional" in elem and not elem["optional"]:
			new_elem += " (required)</li>\n"
		else:
			new_elem += "</li>\n"
		new_params = new_params + u2a(new_elem)

	return new_params

def convert_to_tiname(str, parent):
	if str == "delete":
		return "remove"
	if parent in tidict:
		if str in tidict[parent]:
			return tidict[parent][str]
	token = str.split("_")
	rv = token[0]
	for x in range(1, len(token)):
		rv += token[x].capitalize()
	return rv

def shorten_desc(str):
	token = str.split(".")
	desc = re.sub("ACS", "APS", token[0]) + '.'
	return strip_tags(desc)

def convert_to_android_type(str):
	tokens = str.split("/")
	if len(tokens) > 1:
		rv = []
		for token in tokens:
			rv.append(convert_to_android_type(token))
		return "/".join(rv)

	if str.find("[]") != -1:
		return convert_to_android_type(str.replace("[]", "")) + "[]"

	if str == "String" or str == "Date":
		return "NSString"
	elif str == "Number":
		return "NSNumber"
	elif str == "Hash":
		return "NSDictionary"
	elif str == "Boolean":
		return "NSBoolean"
	elif str == "FileUpload" or str == "BinaryData":
		return "NSURL/NSData"
	elif str == "Any":
		return "Any"
	elif str == "CustomObjects":
		return "APSObjects"
	else:
		return "APS" + str

def parse_methods(members):
	new_members = {}
	for api in members:
		name = api["name"]
		owner = api["owner"]
		tiname = convert_to_tiname(name, owner)
		desc = " * "

		if dict_has_non_empty_member(api, "shortDoc"):
			desc += strip_tags(u2a(api["shortDoc"][:-3])) + "\n"
		else: 
			desc += strip_tags(u2a(shorten_desc(api["doc"]))) + "\n"
		desc += " *\n"

		if "loginRequired" in api["meta"]:
			if api["meta"]["loginRequired"]:
				desc += ' * To use this method, **a user must be logged in before calling this method.**\n'
				desc += " *\n"

		desc += ' * For more details about the underlying REST method, see the\n'
		desc += ' * [ACS API Docs](http://docs.appcelerator.com/cloud/latest/#!/api/' + owner + '-method-' + name + ').\n'
		if dict_has_non_empty_member(api, "params"):
			desc += " * @param data Method parameters specified as an NSDictionary with the following key-value pairs:<ul> \n"
			desc += parse_params(api["params"]) + " * </ul>\n"
		else:
			desc += " * @param data Unused.\n"
		
		desc += " * @param handler Callback to handle the server response. See the Callback section in APSClient."
		if dict_has_non_empty_member(api, "response"):
			desc += "\n * The response data returns the following method-specific properties:<ul>\n"
			desc += parse_params(api["response"]) + " * </ul>"

		new_members[tiname] = desc
		
		extra_desc = "\n * @param progressHandler Callback to handle the progress of the request. See the Callback section in APSClient."

		new_members[tiname+"WithProgress"] = desc + extra_desc
	return new_members


def parse_fields(members):
	desc = ""
	for api in members:
		desc += " * <li>" + api["name"]
		if "type" in api:
			desc += " (" + convert_to_android_type(api["type"]) + ")"
		desc += ": "
		if dict_has_non_empty_member(api, "shortDoc"):
			desc += u2a(api["shortDoc"][:-3])
		else:
			desc += u2a(shorten_desc(api["doc"]))
		desc += "</li>\n"
	return desc


if len(sys.argv) < 3 or re.search("help", sys.argv[1]):
	print "cloud2javadoc.py <input_file.json> <output_file.json>"
	sys.exit(0)

input_file = sys.argv[1]
output_file = sys.argv[2]

json_data=open(input_file)
data = json.load(json_data)
export_data = {}
for obj in data:
	if obj["tagname"] == "class":
		new_obj = {}
		name = u2a(obj["name"])
		if name == "CustomObjects":
			name = "Objects"
		new_obj["doc"] = " * " + strip_tags(u2a(shorten_desc(obj["doc"]))) + "\n"

		fields = parse_fields(obj["members"]["property"])
		if len(fields) > 0:
			new_obj["doc"] += " * The REST object of this class contains the following fields:<ul>\n"
			new_obj["doc"] += fields + " * </ul>\n"

		new_obj["doc"] += ' * For more details about the underlying REST object, see the [ACS API Docs](http://docs.appcelerator.com/cloud/latest/#!/api/' + name + ').'

		methods = parse_methods(obj["members"]["method"])
		if methods is not None:
			new_obj["methods"] = methods

		export_data[name] = new_obj

json_data.close()

file=open(output_file, 'w')
json.dump(export_data, file, indent=4, separators=(',', ': '))
file.close()