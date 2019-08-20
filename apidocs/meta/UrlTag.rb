require "jsduck/meta_tag"

class UrlTag < JsDuck::MetaTag
	def initialize
		@name = "url"
	end
  # One can make use of the #format method to easily support
  # Markdown and {@link} tags inside the contents of the tag.
  def to_html(url)
    "<h3>Since " + url + "</h3>"
  end
end
