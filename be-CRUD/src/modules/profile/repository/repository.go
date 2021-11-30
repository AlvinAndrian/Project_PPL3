package repository

import (
  "github.com/wuryscamp/go-postgres-tutorial/src/modules/profile/model"
)

//ProfileRepository
type ProfileRepository interface {
  Save(*model.Profile) error
  Update(string, *model.Profile) error
  Delete(string) error
  FindByID(string) (*model.Profile, error)
  FindAll() (model.Profiles, error)
}
