require "jsduck/meta_tag"

class AdminRequiredTag < JsDuck::MetaTag
    def initialize
        @name = "adminRequired"
    end

    def to_value(contents)
        contents[0]
    end
end
