class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :rememberable,
    :validatable

  has_one :profile

  has_many :groups, as: :creator, dependent: :destroy
  has_many :groups, through: :group_users
  has_many :group_users, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :reports, dependent: :destroy
end
