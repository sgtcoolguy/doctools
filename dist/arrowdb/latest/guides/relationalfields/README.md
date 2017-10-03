
# Relational Fields


Relational Fields provide a simple way for users to define relations between
any ArrowDB objects.

## Create a Relational Field

To add or update a relation, you must provide an ArrowDB object ID and an ArrowDB
object type. These values together identify a unique ArrowDB object. The relation
is specified using one of these formats:

    [ACS_<TYPENAME>]<fieldname_id>
    [ACS_<TYPENAME>]<fieldname_ids>
    [CUSTOM_<TYPENAME>]<fieldname_id>
    [CUSTOM_<TYPENAME>]<fieldname_ids>

Where _TYPENAME_ indicates ArrowDB type or ArrowDB custom object type of the object
pointed to. For example, ArrowDB_User represents an ArrowDB User object, ArrowDB_Photo
represents an ArrowDB Photo object, and CUSTOM_car represents an ArrowDB custom object
of class `car`.

To create the relation, create a custom field using one of the relational
field name formats shown above. For example, in the following custom fields,
we add two relations :
    
    Custom_fields = {
        "[ACS_User]owner_id":"4d6e77386f70950c89000001",
        "[CUSTOM_car]mycar_id":"4d51d4186f70952d4c000006"
    }
    
For example, when creating a custom `car` object, we can specify an owner and
picture for the car:
    
    $ curl -b c.txt -c c.txt -F "key=sesObkV0qTaPSEwcHc6DGcR21EWN9HT0" -F "id=506e4c775554f7470b00001d" -F "fields={"[ACS_User]owner_id":"506e4c735554f7470b000003", "[ACS_Photo]picture_id":"506e4c755554f7470b00000a"}" "https://api.cloud.appcelerator.com/v1/objects/car/create.json?key="
    {
      "meta": {
        "code": 200,
        "status": "ok",
        "method_name": "updateCustomObject"
      },
      "response": {
        "car": [
          {
            "[ACS_Photo]picture_id": [
              {
                "id": "506e4c755554f7470b00000a",
                "filename": "photo.jpg",
                "size": 584344,
                "md5": "589b8ad43ed20bf8e622d719642bc939",
                "created_at": "2012-10-05T02:56:53+0000",
                "updated_at": "2012-10-05T02:56:53+0000",
                "processed": false,
                "user": {
                  "id": "506e4c735554f7470b000005",
                  "first_name": "Frank",
                  "last_name": "Jobs",
                  "created_at": "2012-10-05T02:56:51+0000",
                  "updated_at": "2012-10-05T02:56:55+0000",
                  "external_accounts": [
    
                  ],
                  "confirmed_at": "2012-10-05T02:56:51+0000",
                  "email": "frank@guy.com",
                  "admin": "false"
                },
                "content_type": "image/jpeg",
                "likes_count": 1
              }
            ],
            "color": "blue",
            "model": "nissan",
            "mileage": 1000,
            "purchased_date": "2011-11-01 17:08:36 -0700",
            "[ACS_User]owner_id": [
              {
                "id": "506e4c735554f7470b000003",
                "first_name": "Alice",
                "last_name": "Gal",
                "created_at": "2012-10-05T02:56:51+0000",
                "updated_at": "2012-10-05T02:56:51+0000",
                "external_accounts": [
    
                ],
                "confirmed_at": "2012-10-05T02:56:51+0000",
                "username": "alice",
                "email": "alice@gal.com",
                "admin": "false"
              }
            ],
            "id": "506e4c775554f7470b00001d",
            "created_at": "2012-10-05T02:56:55+0000",
            "updated_at": "2012-10-05T02:56:56+0000",
            "user": {
              "id": "506e4c735554f7470b000005",
              "first_name": "Frank",
              "last_name": "Jobs",
              "created_at": "2012-10-05T02:56:51+0000",
              "updated_at": "2012-10-05T02:56:55+0000",
              "external_accounts": [
    
              ],
              "confirmed_at": "2012-10-05T02:56:51+0000",
              "email": "frank@guy.com",
              "admin": "false"
            }
          }
        ]
      }
    }
    

### Show a Relational Field

When you show an ArrowDB object, if the ArrowDB object has a relation to another ArrowDB
object, ArrowDB includes the referenced ArrowDB object. For example, suppose a Custom object 
of type `car` has two relations: an owner and a picture. When you call `show` on the object, 
the user and photo object are included in the response. Example JSON response:  
    
    {
      "meta": {
        "code": 200,
        "status": "ok",
        "method_name": "createObject"
      },
      "response": {
        "car": [
          {
            "color": "blue",
            "make": "nissan",
            "purchased_at": "2011-11-03T00:07:37+0000",
            "year": 2005,
            "used": false,
            "coordinates": [
              [
                -122.1,
                37.1
              ]
            ],
            “[ACS_User]owner_id” : {
                "id":"4d6e77386f70950c89000001",
                "first_name":"John",
                "last_name":"Smith",
                "role": "teacher",
                "created_at":"2011-03-02T16:58:32+0000",
                "updated_at":"2011-03-02T16:58:32+0000",
                "facebook_authorized":false,
                "email":"john.smith@company.com",
                "photo": {
                    "id":"4d882896d0afbe0a3600000d",
                    "filename":"photo.jpg",
                    "size":584344,
                    "md5":"589b8ad43ed20bf8e622d719642bc939",
                    "created_at":"2011-03-22T04:41:58+0000",
                    "updated_at":"2011-03-22T04:42:07+0000",
                    "processed":false
                },
                "custom_fields": {
                    "age":28,
                    "favorite_color":"blue"
                }
            },
            “[ACS_Photo]picture_id”:{
                "id":"4d51d4186f70952d4c000006",
                "filename":"photo.jpg",
                "size":584344,
                "md5":"589b8ad43ed20bf8e622d719642bc939",
                "created_at":"2011-02-08T23:39:04+0000",
                "updated_at":"2011-02-08T23:39:04+0000",
                "processed":false
            },
            "id": "4ec42de1d9ca72c50700000d",
            "created_at": "2011-11-16T21:40:49+0000",
            "updated_at": "2011-11-16T21:40:49+0000"
          }
        ]
      }
    }
    

### Query a Relational Field

A relation points to an ArrowDB object, so to query a relation, you must first
get the ArrowDB object pointed by the relation. For example, if you want to
query cars whose owner is “John Smith”, you first need to find the {@link Users}
object whose full name is “John Smith”:

    $ curl -c cookies.txt -b cookies.txt -X GET --data-urlencode 'where={"first_name":"John","last_name":”Smith”}' --data-urlencode 'order=created_at' "https://api.cloud.appcelerator.com/v1/users/query.json?key={YOUR APP APP KEY}"
    
If the user exists, use the user ID to query the custom objects collection
for cars that have a `[ACS_User]owner_id` property with the specified value.

    $ curl -c cookies.txt -b cookies.txt -X GET --data-urlencode 'where= {"[ACS_User]owner_id":"the user’s object id"}' --data-urlencode 'order=-purchased_at' "https://api.cloud.appcelerator.com/v1/objects/car/query.json?key={YOUR APP APP KEY}"
    
### Remove a Relational Field

To remove a relational field from an ArrowDB object, set the field's value to null. For
example, remove to picture from a Custom object:
    
    $ curl -b cookies.txt -c cookies.txt -X PUT --data-urlencode 'fields={“[ACS_Photo]picture_id”:null}' "https://api.cloud.appcelerator.com/v1/objects/car/update.json?key={YOUR APP APP KEY}"
    
