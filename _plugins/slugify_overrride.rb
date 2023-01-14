# I found this on a website under the name "titleize_overrride.rb". I added the slugify constants. I can't remember where I found this file.

module Jekyll
  module Utils
    # Constants for use in #slugify
    SLUGIFY_MODES = %w(raw default pretty ascii latin).freeze
    SLUGIFY_RAW_REGEXP = Regexp.new('\\s+').freeze
    SLUGIFY_DEFAULT_REGEXP = Regexp.new("[^\\p{M}\\p{L}\\p{Nd}.'()]+").freeze
    SLUGIFY_PRETTY_REGEXP = Regexp.new("[^\\p{M}\\p{L}\\p{Nd}._~!$&'()+,;=@]+").freeze
    SLUGIFY_ASCII_REGEXP = Regexp.new("[^[A-Za-z0-9]]+").freeze
	
	# Takes a slug and turns it into a simple title.
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