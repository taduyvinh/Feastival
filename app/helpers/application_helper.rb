module ApplicationHelper
  def flash_messages
    safe_join(flash.map do |type, message|
      content_tag :div, message, class: flash_type(type).to_s
    end)
  end

  def flash_type type
    Settings.flash_type[type.to_sym]
  end
end
