require "jsduck/meta_tag"

class PlatformTag < JsDuck::MetaTag
  def initialize
      @name = "platform"
  end
  # This will be called with an array of all @platform tags on one class.
  # One can make use of the #format method to easily support
  # Markdown and {@link} tags inside the contents of the tag.
  def to_html(platforms)
    pretty_names = {
      'android' => 'Android',
      'blackberry' => 'BlackBerry',
      'iphone' => 'iPhone',
      'ipad' => 'iPad',
      'macos' => 'macOS',
      'mobileweb' => 'Mobile Web',
      'windowsphone' => 'Window Phone',
      'tizen' => 'Tizen'
    }
    "<ul class='platforms'>" + platforms.map{|platform| 
        name, version = platform.split()
        "<li class='platform-"+name+"'
        title='"+pretty_names[name]+"'>"+version+"</li>"
        }.join("") + "</ul>" 
  end
end
