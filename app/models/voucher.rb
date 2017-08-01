class Voucher < ApplicationRecord
  has_many :voucher_codes, dependent: :destroy
  has_many :groups, through: :voucher_codes
end
