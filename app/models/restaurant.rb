class Restaurant < ApplicationRecord
  UPDATE_PARAMS = [:category_id, :manager_id, :title,
    :address, :latitude, :longitude, :description,
    :phonenumber, :website, :is_approved].freeze

  belongs_to :category
  belongs_to :manager, class_name: User.name

  has_many :groups
  has_many :menus, dependent: :destroy
  has_many :opening_hours, dependent: :destroy
  has_many :reports, as: :reported, dependent: :destroy
  has_many :vouchers, dependent: :destroy
end
