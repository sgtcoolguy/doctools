require "jsduck/meta_tag"

class PseudoTag < JsDuck::MetaTag
	def initialize
		@name = "pseudo"
	end
  def to_html(vals)
       return [
         "<p class='private'><strong>NOTE</strong> ",
         "This is an abstract type. Any object meeting this description can be used ",
         "where this type is used.</p>",  	
       ]
  end
end