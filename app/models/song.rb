# == Schema Information
#
# Table name: songs
#
#  id         :integer          not null, primary key
#  song_title :string
#  album_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Song < ActiveRecord::Base
  belongs_to :album
  belongs_to :artist

  delegate :artist, to: :album

  validates :song_title, presence: true
end
