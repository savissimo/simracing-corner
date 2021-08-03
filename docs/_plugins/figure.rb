module Jekyll
	class FigureTag < Liquid::Tag
		
		def initialize(tag_name, input, tokens)
			super
			@input = input
		end
		
		# Lookup allows access to the page/post variables through the tag context
		def lookup(context, name)
			lookup = context
			name.split(".").each { |value| lookup = lookup[value] }
			lookup
		end

		def split_params(params)
			params.split("|")
		end
		
		def render(context)
			splitInput = split_params(@input)

			url = splitInput[0].strip
			alt = splitInput[1].strip
			caption = (splitInput[2] || "").strip
			
			site = context.registers[:site]
			markdownifier = site.find_converter_instance(::Jekyll::Converters::Markdown)

			captionElement = nil
			if (!caption.nil? && !caption.empty?)
				captionElement = "<figcaption>#{markdownifier.convert(caption)}</figcaption>"
			end

			"<figure class=\"content-figure\">
				<img src=\"#{url}\" alt=\"#{alt}\" />
				#{captionElement}
			</figure>"
		end

	end
end

Liquid::Template.register_tag('figure', Jekyll::FigureTag)
