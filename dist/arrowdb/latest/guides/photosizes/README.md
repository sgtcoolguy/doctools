# Photo Uploading & Resizing

ArrowDB provides a great amount of flexibility when creating photo objects, or adding photos to
other objects.

## Custom Photo Sizes

App developers can specify a custom set of photo sizes by specifying the `photo_sizes[<name>]=<width>x<height>` parameter up to
five times such as:
    
    photo_sizes[preview]=100x100#
    photo_sizes[android]=800x480
    photo_sizes[iphone]=960x640
    photo_sizes[ipad]=1024x768
    

To specify a size that results in a square image, give the same width and
height along with a `#` immediately after, as shown above.

You may specify the `photo_sizes` parameter when creating or updating a Photos object or when adding
a photo with the Users or Places create or update method.

The resized images are generated asynchronously, so the API or SDK call returns
immediately with a response showing photo metadata:
    
    $ curl -b cookies.txt -c cookies.txt -F "photo=@photo.jpg" -F "photo_sizes[preview]=100x100#" -F "photo_sizes[android]=800x480" -F "photo_sizes[iphone]=960x640" -F "photo_sizes[ipad]=1024x768" http://api.cloud.appcelerator.com/v1/photos/create.json?key=gKr9bfv4nOlfKkqyh4UoAxpPvDqBPrSE
    {
      "meta": {
        "code": 200,
        "status": "ok",
        "method_name": "showPhoto"
      },
      "response": {
        "photos": [
          {
            "id": "4edc8af33ae7406bf7000003",
            "filename": "photo.jpg",
            "size": 584344,
            "md5": "589b8ad43ed20bf8e622d719642bc939",
            "created_at": "2011-12-05T09:12:19+0000",
            "updated_at": "2011-12-05T09:12:25+0000",
            "processed": false,
            "user": {
              "id": "4ebb22bf3ae740077f000006",
              "first_name": "Mike",
              "last_name": "Goff",
              "created_at": "2011-11-10T01:02:56+0000",
              "updated_at": "2011-12-05T09:10:55+0000",
              "email": "mike@appcelerator.com"
            }
            "content_type": "image/jpeg"
          }
        ]
      }
    }

Note that in the above response `processed=false`. This indicates that the
photo is still processing in the background. Once the photo has been
processed, the `processed` flag will be set to `true` and the URLs 
to access the photo are shown:
    
    $ curl -b cookies.txt -c cookies.txt "http://api.cloud.appcelerator.com/v1/photos/show.json?key=aKgDjsrxM2wqL9fjhS1nnvgvnTlRDdJn&photo_id=4edc8af33ae7406bf7000003"  
    {
      "meta": {
        "status": "ok",
        "code": 200,
        "method_name": "showPhoto"
      },
      "response": {
        "photos": [
          {
            "id": "4eab39f7d3e986d677000001",
            "filename": "photo.jpg",
            "size": 584344,
            "md5": "589b8ad43ed20bf8e622d719642bc939",
            "created_at": "2011-10-28T23:25:45+0000",
            "updated_at": "2011-10-28T23:26:01+0000",
            "processed": true,
            "user": {
              "id": "4ea9e22ad3e986ba69000002",
              "first_name": "Mike",
              "last_name": "Goff",
              "created_at": "2011-10-27T22:58:52+0000",
              "updated_at": "2011-10-27T23:15:36+0000",
              "email": "mike@appcelerator.com"
            },
            "urls": {
              "preview": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8af33ae7406bf7000004/photo_preview.jpg",
              "android": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8af33ae7406bf7000004/photo_android.jpg",
              "iphone": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8af33ae7406bf7000004/photo_iphone.jpg",
              "ipad": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8af33ae7406bf7000004/photo_ipad.jpg",
              "original": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8af33ae7406bf7000004/photo_original.jpg"
            },
            "content_type": "image/jpeg",
          }
        ]
      }
    }

## Synchronous Photo Uploading

You can also specify photo sizes to be processed synchronously during the
create or update calls for photos and other objects with attached photos. This
can be useful for immediately showing a thumbnail of the photo that was just
uploaded. Specify `photo_sync_sizes[]=<size name>` one or more times in the
request. The response will contain URLs for the original photo, plus the size
or sizes which were processed synchronously. The property `processed` will be
`false` until all processing has been completed. This feature may be used with
either the default photo sizes or custom photo sizes.

    
    
    $ curl -b cookies.txt -c cookies.txt -F "photo=@photo.jpg" -F "photo_sizes[preview]=100x100#" -F "photo_sizes[android]=800x480" -F "photo_sizes[iphone]=960x640" -F "photo_sizes[ipad]=1024x768" -F "photo_sync_sizes[]=preview" http://api.cloud.appcelerator.com/v1/photos/create.json?key=aKgDjsrxM2wqL9fjhS1nnvgvnTlRDdJn
    {
      "meta": {
        "code": 200,
        "status": "ok",
        "method_name": "createPhoto"
      },
      "response": {
        "photos": [
          {
            "id": "4edc8ff43ae7406bf7000008",
            "filename": "photo.jpg",
            "size": 584344,
            "md5": "589b8ad43ed20bf8e622d719642bc939",
            "created_at": "2011-12-05T09:33:41+0000",
            "updated_at": "2011-12-05T09:33:41+0000",
            "processed": false,
            "user": {
              "id": "4ebb22bf3ae740077f000006",
              "first_name": "Mike",
              "last_name": "Goff",
              "created_at": "2011-11-10T01:02:56+0000",
              "updated_at": "2011-12-05T09:10:55+0000",
              "email": "mike@appcelerator.com"
            },
            "urls": {
              "preview": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8ff53ae7406bf7000009/photo_preview.jpg",
              "original": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8ff53ae7406bf7000009/photo_original.jpg"
            },
            "content_type": "image/jpeg"
          }
        ]
      }
    }
    

After processing, all photo sizes will be available and `processed=true` will
be set.

    
    
    $ curl -b cookies.txt -c cookies.txt "http://api.cloud.appcelerator.com/v1/photos/show.json?key=aKgDjsrxM2wqL9fjhS1nnvgvnTlRDdJn&photo_id=4edc8ff43ae7406bf7000008"
    {
      "meta": {
        "code": 200,
        "status": "ok",
        "method_name": "showPhoto"
      },
      "response": {
        "photos": [
          {
            "id": "4edc8ff43ae7406bf7000008",
            "filename": "photo.jpg",
            "size": 584344,
            "md5": "589b8ad43ed20bf8e622d719642bc939",
            "created_at": "2011-12-05T09:33:41+0000",
            "updated_at": "2011-12-05T09:33:43+0000",
            "processed": true,
            "user": {
              "id": "4ebb22bf3ae740077f000006",
              "first_name": "Mike",
              "last_name": "Goff",
              "created_at": "2011-11-10T01:02:56+0000",
              "updated_at": "2011-12-05T09:10:55+0000",
              "email": "mike@appcelerator.com"
            },
            "urls": {
              "preview": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8ff53ae7406bf7000009/photo_preview.jpg",
              "android": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8ff53ae7406bf7000009/photo_android.jpg",
              "iphone": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8ff53ae7406bf7000009/photo_iphone.jpg",
              "ipad": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8ff53ae7406bf7000009/photo_ipad.jpg",
              "original": "http://storage.appcelerator.com/6QoSiKlR7hUjhf4GEOVD1hyPlHxqsiGi/photos/c9/39/4edc8ff53ae7406bf7000009/photo_original.jpg"
            },
            "content_type": "image/jpeg",
            "exif": {
              "create_date": "2010-06-21T02:19:20+0000",
              "width": 1600,
              "height": 1067,
              "shutter_speed": "1/60",
              "make": "Canon",
              "model": "Canon EOS 5D Mark II"
            }
          }
        ]
      }
    }
    


## Deprecated Behavior

ACS applications used to create the following default photo sizes when a photo was created:

<table class="doc-table">
<tr>
  <th>Size Name</th>
  <th>Max Width</th>
  <th>Max Height</th>
  <th>Aspect Ratio</th>
</tr>
<tr>
  <td>square_75</td>
  <td>75</td>
  <td>75</td>
  <td>square</td>
</tr>
<tr>
  <td>thumb_100</td>
  <td>100</td>
  <td>67</td>
  <td>original</td>
</tr>
<tr>
  <td>small_240</td>
  <td>240</td>
  <td>160</td>
  <td>original</td>
</tr>
<tr>
  <td>medium_500</td>
  <td>500</td>
  <td>333</td>
  <td>original</td>
</tr>
<tr>
  <td>medium_640</td>
  <td>640</td>
  <td>427</td>
  <td>original</td>
</tr>
<tr>
  <td>large_1024</td>
  <td>1024</td>
  <td>683</td>
  <td>original</td>
</tr>
</table>

