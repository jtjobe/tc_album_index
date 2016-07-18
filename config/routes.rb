# == Route Map
#
# Prefix Verb URI Pattern               Controller#Action
#   root GET  /                         search#home
# search POST /search(.:format)         search#search
#        GET  /artists/:query(.:format) search#artists
#        GET  /albums/:query(.:format)  search#albums
#        GET  /songs/:query(.:format)   search#songs
#

Rails.application.routes.draw do
  root  'search#home'
  post  '/search'            => 'search#search'
  get   '/artists/:query'    => 'search#artists'
  get   '/albums/:query'     => 'search#albums'
  get   '/songs/:query'      => 'search#songs'
end
