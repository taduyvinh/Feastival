class Voucher < ApplicationRecord
  ATTRIBUTE_PARAMS = %i(from to description image).freeze

  mount_base64_uploader :image, ImageUploader

  belongs_to :restaurants

  has_many :voucher_codes, dependent: :destroy
  has_many :groups, through: :voucher_codes

  validates :from, presence: true, inclusion: {
    in: Settings.min_period_of_time.hour.from_now..DateTime::Infinity.new
  }
  validates :to, presence: true
  validates :description, presence: true
end
