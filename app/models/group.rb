class Group < ApplicationRecord
  GROUP_PARAMS = %i(category_id restaurant_id creator_id title description
    time address longitude latitude size).freeze
  reverse_geocoded_by :latitude, :longitude

  resourcify

  belongs_to :creator, class_name: User.name
  belongs_to :restaurant
  belongs_to :category

  has_many :group_users, dependent: :destroy, foreign_key: :group_id
  has_many :messages, dependent: :destroy
  has_many :users, through: :group_users
  has_many :voucher_codes, dependent: :destroy
  has_many :vouchers, through: :voucher_codes

  validates :title, presence: true, length: {maximum: 250}
  validates :address, presence: true, length: {maximum: 250}
  validates :time, presence: true, inclusion: {
    in: 1.hour.from_now..DateTime::Infinity.new
  }
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :category, :creator, presence: true

  def assign_creator user
    user.add_role :creator, self
  end
end
