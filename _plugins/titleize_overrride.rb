module Jekyll
  module Utils
    def titleize_slug(slug)
      slug.split(/[_-]/).join(' ')
    end
	def slugify(string, mode: nil, cased: true)
      mode ||= "default"
      return nil if string.nil?
	
      unless SLUGIFY_MODES.include?(mode)
        return cased ? string : string.downcase
      end
	
      # Drop accent marks from latin characters. Everything else turns to ?
      if mode == "latin"
        I18n.config.available_locales = :en if I18n.config.available_locales.empty?
        string = I18n.transliterate(string)
      end
	
      slug = replace_character_sequence_with_hyphen(string, :mode => mode)
	
      # Remove leading/trailing hyphen
      slug.gsub!(%r!^-|-$!i, "")
	
      slug.downcase! unless cased
      Jekyll.logger.warn("Warning:", "Empty `slug` generated for '#{string}'.") if slug.empty?
      slug
    end
  end
end