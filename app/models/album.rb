# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  album_title :string
#  artist_id   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Album < ActiveRecord::Base
  belongs_to :artist
  has_many :songs
  
  validates :album_title, presence: true
end
