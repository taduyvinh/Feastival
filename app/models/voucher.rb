class Voucher < ApplicationRecord
  has_many :groups, through: :voucher_codes
  has_many :voucher_codes, dependent: :destroy
end
