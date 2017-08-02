class Profile < ApplicationRecord
  belongs_to :user

  has_many :reports, as: :reported, dependent: :destroy

  validates :name, presence: true
  validates :phonenumber, presence: true
  validates :job, presence: true
  validates :description, presence: true

end
