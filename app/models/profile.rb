class Profile < ApplicationRecord
  enum gender: [:male, :female, :undefined]

  mount_base64_uploader :avatar, ImageUploader

  belongs_to :user

  has_many :reports, as: :reported, dependent: :destroy

  validates :name, presence: true
  validates :phonenumber, presence: true
  validates :job, presence: true
  validates :description, presence: true
end
