class Group < ApplicationRecord
  belongs_to :creator, class_name: User.name
  belongs_to :restaurant
  belongs_to :category

  has_many :group_users, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :users, through: :group_users
  has_many :vouchers, through: :voucher_codes
  has_many :voucher_codes, dependent: :destroy
end
