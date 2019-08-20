require "jsduck/meta_tag"

class CreationOnlyTag < JsDuck::MetaTag
	def initialize
		@name = "creationOnly"
		@signature = {:long => "Creation-Only", :short => "CO"}
	end
	def to_html(createable)
		""
	end
end