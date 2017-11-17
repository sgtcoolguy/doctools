#  Custom Objects & Fields

##  Custom Objects and Custom Fields

ArrowDB provides many types of commonly used predefined
objects such as {@link Users} and {@link Photos}. However, you may want to create
custom data types, or store custom fields on predefined ArrowDB objects. Custom Objects and 
Custom Data Fields provide your application with this ability.

##  Creating Custom Objects

If you would like to create custom objects with a custom object type, please
refer to {@link CustomObjects} to get a list of API calls that can be used to create and access
custom objects.

##  Adding Custom Fields to Predefined Objects

If you would like to store additional custom data into any predefined
ArrowDB objects, you can simply pass in JSON encoded
custom_fields. Any number of custom fields can be specified for an instance of
a predefined object.  
  
For example, if you are using the Users API and want to store the age and
favorite color of each user, simply include JSON encoding of custom_fields  
    
    custom_fields='{
      "age": 23,
      "favorite_color": "blue"
    }'
    

For example, to associate the above custom fields in user create    
    
    $ curl -b cookies.txt -c cookies.txt -X POST --data-urlencode "email=john.smith@company.com" --data-urlencode "role=teacher" --data-urlencode "first_name=John" --data-urlencode "last_name=Smith" --data-urlencode "password=pass" --data-urlencode "password_confirmation=pass" --data-urlencode 'custom_fields={"age":23, "favorite_color":"blue"}' https://api.cloud.appcelerator.com/v1/users/create.json?key=<YOUR APP APP KEY>
    {
      "meta": {
        "status": "ok",
        "code": 200,
        "method_name": "createUser",
        "session_id": "xdqCplQqcXBq8WW1ir9nzq5U4nE"
      },
      "response": {
        "users": [
          {
            "id": "4ec5907bd9ca72020c000005",
            "first_name": "John",
            "last_name": "Smith",
            "created_at": "2011-11-17T22:53:48+0000",
            "updated_at": "2011-11-17T22:53:48+0000",
            "external_accounts": [
    
            ],
            "role": "teacher",
            "email": "john.smith@company.com",
            "custom_fields": {
              "age": 23,
              "favorite_color": "blue"
            },
            "stats": {
              "photos": {
                "total_count": 0
              },
              "storage": {
                "used": 0
              }
            }
          }
        ]
      }
    }
    

Custom Data are returned in the `custom_fields` JSON response field in the
type that was specified. Attempting to define custom fields using invalid
types or an incorrect naming convention will be silently ignored.

##  Supported Data Types

<table class="doc-table">
  <tr><th>Type</th><th>Example</th>
  <tr>
    <td>Boolean&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>true or false</td>
  </tr>
  <tr>
    <td>String&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>"blue"</td>
  </tr>
  <tr>
    <td>Number&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>23 or 1.234</td>
  </tr>
  <tr>
    <td>Date&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>"2011-11-02 17:07:37 -0700". If a string value matches date format "yyyy-mm-dd hh:mm:ss+zzzz" or "yyyy-mm-ddThh:mm:ss+zzzz", it will be converted to Date type on the Arrow backend</td>
  </tr>
</table>

You could also store more complex data types such as Array and Hash. Hash and Array can be embedded into each other. Currently, data stored inside a Hash is not queryable.
    
<table class="doc-table">
<tr><th>Type</th><th>Example</th>
<tr>
  <td>Hash&nbsp;&nbsp;</td>
  <td>{"age":23,"scores":{"math":90, "physics":100}, "my_favorite_colors":["blue","red"]}</td>
</tr>
<tr>
  <td>Array&nbsp;&nbsp;</td>
  <td>["nissan", "honda"] or [2006, 2008], [{"age":28}, {"color":"blue"}]</td>
</tr>
</table>

## Indexing Size Limit for Custom Objects and Fields

To support efficient data query operations, ArrowDB indexes the 
field names and values of each custom object, or custom fields you add to a predefined object. For example, 
suppose you create a custom object, `cars`, with the fields `make` and `model`. ArrowDB will create 
two index entries in the MongoDB database, one for each field. The total size of an index entry, 
including meta-data added by ArrowDB, must be less than **1024 bytes** (1KB). 

If a custom field's name or value exceeds this size, then no index entry for that field is created.
Consequently, if you run a custom [query](#!/guide/search_query-section-query-overview) against that field,
nothing will be returned.

For instance, in the previous example, suppose the string value assigned to `model`
was greater than 1KB. If you queried the `cars` collection for objects whose `model`
matched that value, no objects would be returned:

    Cloud.Objects.query({
        classname: 'cars',
        where: {
            make: {
              $regex:"^That Really Long Model Name*"
            }
        }
    }, function (e) {
          if (e.success) {
            console.log(e.cars.length); // 0
          }
    });


##  Geographic Coordinates in Custom Fields

To enable geographical search, there is a predefined custom field,
`coordinates`, for optionally storing geographic coordinates. The `coordinates` field can
store a single location as an array ( `[longitude, latitude]` ) or multiple
locations as an array of arrays ( `[[longitude1,latitude1], [longitude2, latitude2]]` ). So for the
above example, to store location information about the user, we might have:
    
    custom_fields = '{ "color": "blue",
        "age": 23,
        "coordinates": [-122.1, 37.1] 
    }'

##  Remove a Field

If you wish to remove a custom field during update, simply set the field value
to null.  
    
    {
      "age": null
    }
    

##  Querying Custom Fields

Data stored in custom fields other than Array and Hash can be queried together
with predefined fields. Please refer to [Query](#!/guide/search_query-section-query-overview) 
for more information. If you define a
custom field name that is the same as one of predefined fields, you will be
able to store and retrieve it but you won't be able to query on it since the
query action would be performed on the predefined field instead. For example,
{@link Users} has a predefined field called `first_name`,
if you define a custom field also called `first_name`, when you try to query
first_name. it will only query against the predefined `first_name` field.

##  Availability

The following ArrowDB objects allow you to add one or more
extra data fields during `create` and `update` actions:

  * {@link Chats#create Chats.create}
  * {@link Checkins#create}
  * {@link PhotoCollections#create} and {@link PhotoCollections#update update}
  * {@link Events#create} and {@link Events#update update}
  * {@link Files#create} and {@link Files#update update}
  * {@link Messages#create}
  * {@link Photos#create} and {@link Photos#update update}
  * {@link Places#create} and {@link Places#update update} 
  * {@link Posts#create} and {@link Posts#update update}
  * {@link Reviews#create} and {@link Reviews#update update}
  * {@link Statuses#create}
  * {@link Users#create} and {@link Users#update update}

##  iOS

If you are using the [iOS APS SDK](#!/guide/ios), to create an object's custom fields use a
NSDictionary to construct the custom data you want to associate with the object.

The following table lists the data types you can define with the iOS APS SDK:

<table class="doc-table">
    <tr><th>Type</th><th>Example</th><th>iOS Class</th>
    <tr>
      <td>String&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>"blue"&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>NString</td>
    </tr>
    <tr>
      <td>Number&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>123 or 1.234</td>
      <td>[NSNumber numberWithInt:] or [NSNumber numberWithDouble:]&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <td>Boolean&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>true or false</td>
      <td>[NSNumber numberWithBool:]&nbsp;&nbsp;&nbsp;&nbsp;</td>
    </tr>
    <tr>
      <td>Date&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>"2011-11-02 17:07:37 -0700"&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>NSString</td>
    </tr>
    <tr>
      <td>Hash&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>{"age": 23, "color": "blue"}&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>NSDictionary</td>
    </tr>
    <tr>
      <td>Array&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>[123, 234] or ["mike", "joe"]&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>NSArray</td>
    </tr>
    <tr>
      <td>Geo coordinates&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>[lng, lat], e.g. [122.33, 37.48]&nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td>NSArray with two NSNumber elements</td>
    </tr>
</table>

For example, if you want to create a user with custom fields, such as
eye_color, enrolled_at, etc., you can put all the custom fields in a
NSDictionary.

    NSMutableDictionary *customFields = [NSMutableDictionary dictionary];
    [customFields setObject:@"brown" forKey:@"eye_color"]; // set a string
    [customFields setObject:@"2011-11-02 17:07:37 -0700" forKey:@"enrolled_at"]; // set a date
    [customFields setObject:[NSNumber numberWithInt:23] forKey:@"age"]; // set a number
    [customFields setObject:[NSNumber numberWithBool:true] forKey:@"student"]; // set a boolean
    [customFields setObject:[NSArray arrayWithObjects:@"hiking", @"reading", nil] forKey:@"hobby"]; // set an array
    [customFields setObject:[NSDictionary dictionaryWithObjectsAndKeys:@"cookies", @"favorite", nil] forKey:@"others"];

    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    [params setObject:@"john@usc.com" forKey:@"email"];
    [params setObject:@"John" forKey:@"first_name"];
    [params setObject:@"Woo" forKey:@"last_name"];
    [params setObject:@"pass" forKey:@"password"];
    [params setObject:@"pass" forKey:@"password_confirmation"];
    [params setObject:customFields forKey:@"custom_fields"]; // add custom fields

    [APSUsers create:params withBlock:^(APSResponse *e){
        if (e.success) {
            NSArray *users = [e.response valueForKey:@"users"];
            if ([users count] == 1) {
                NSDictionary *user = users[0];
                NSLog(@"Successfully registered user %@", [user valueForKey:@"email"]);
                NSLog(@"custom fields are %@", [user valueForKey:@"custom_fields"]);
            }
        } else {
            [[[UIAlertView alloc] initWithTitle:@"Error" message:e.errorMessage delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil] show];
        }

If you would like to use your own custom data type, you need to provide a class method to JSON encode the
data of your object.

    @interface MyObject : NSObject
      @property NSString *color;
      @property NSNumber *mileage;
    @end

    @implementation MyObject
    /*!
     Converts the object to an encodable JSON object.
     @return Object encodable as JSON, such as a NSDictionary or NSArray.
     */
    - (id)toJSON
    {
        return [NSDictionary dictionaryWithObjectsAndKeys:self.color, @"color", self.mileage, @"mileage", nil];
    }
    @end

    MyObject *object = [[MyObject alloc] init];
    object.color = @"green";
    object.mileage = [NSNumber numberWithDouble:23.3];
    NSMutableDictionary *customFields = [NSMutableDictionary dictionary];
    [customFields setObject:[object toJSON] forKey:@"MyObject"];

