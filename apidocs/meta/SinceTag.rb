require "jsduck/meta_tag"

class SinceTag < JsDuck::MetaTag
	def initialize
		@name = "since"
	end
  # This will be called with an array of all @license tags on one class.
  # One can make use of the #format method to easily support
  # Markdown and {@link} tags inside the contents of the tag.
  def to_html(since)
    "<h3>Since " + since.join("") + "</h3>"
  end
end
