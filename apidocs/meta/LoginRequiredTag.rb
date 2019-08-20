require "jsduck/meta_tag"

class LoginRequiredTag < JsDuck::MetaTag
	def initialize
		@name = "loginRequired"
	end
  # One can make use of the #format method to easily support
  # Markdown and {@link} tags inside the contents of the tag.
  def to_html(loginRequired)
      "<strong>User Login Required: " + ((loginRequired && "Yes") || "No") + "</strong>"
  end
end
