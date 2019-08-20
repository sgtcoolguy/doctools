require "jsduck/meta_tag"

class NonCreationTag < JsDuck::MetaTag
  def initialize
    @name = "nonCreation"
    @signature = {:long => "Non-Creation", :short => "NC"}
  end
	  	
  def to_html(createable)
    ""
  end
end