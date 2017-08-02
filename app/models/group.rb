class Group < ApplicationRecord
  GROUP_PARAMS = %i(category_id restaurant_id creator_id title description
    time address longitude latitude size).freeze
  reverse_geocoded_by :latitude, :longitude
  after_create :assign_creator_role

  resourcify

  belongs_to :creator, class_name: User.name
  belongs_to :restaurant
  belongs_to :category

  has_many :group_users, dependent: :destroy
  has_many :joined_group_users, ->{joined}, class_name: GroupUser.name
  has_many :messages, dependent: :destroy
  has_many :users, through: :group_users
  has_many :joined_users, through: :joined_group_users, source: :user
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

  lambda_display_groups = lambda do |lat, lng, distance|
    near([lat, lng], distance.to_i / 1000, units: :km) if lat && lng && distance
  end

  scope :displayed, lambda_display_groups
  scope :not_restaurant, ->{where restaurant_id: nil}

  def assign_creator_role
    creator.add_role :creator, self
  end
end
