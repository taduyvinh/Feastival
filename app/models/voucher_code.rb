class VoucherCode < ApplicationRecord
  belongs_to :voucher
  belongs_to :group
end
