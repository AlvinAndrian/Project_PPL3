package main

import (
  "fmt"
  "github.com/wuryscamp/go-postgres-tutorial/config"
  "github.com/wuryscamp/go-postgres-tutorial/src/modules/profile/model"
  "github.com/wuryscamp/go-postgres-tutorial/src/modules/profile/repository"
)

func main() {

  fmt.Println("Go Postgres Tutorial")

  db, err := config.GetPostgersDB()

  if err != nil {
    fmt.Println(err)
  }


  wury := model.NewProfile()
  wury.ID = "P2"
  wury.FirstName = "Rob"
  wury.LastName = "Pike"
  wury.Email = "rob@yahoo.com"
  wury.Password = "123456"
  fmt.Println(wury)

  profileRepositoryPostgres := repository.NewProfileRepositoryPostgres(db)

  profiles, err := getProfiles(profileRepositoryPostgres)

  if err != nil {
    fmt.Println(err)
  }

  fmt.Println("=======================")

  for _, v := range profiles {
    fmt.Println(v)
  }
}

func saveProfile(p *model.Profile, repo repository.ProfileRepository) error{
  err := repo.Save(p)

  if err != nil {
    return err
  }

  return nil
}

func updateProfile(p *model.Profile, repo repository.ProfileRepository) error{
  err := repo.Update(p.ID, p)

  if err != nil {
    return err
  }

  return nil
}

func deleteProfile(id string, repo repository.ProfileRepository) error{
  err := repo.Delete(id)

  if err != nil {
    return err
  }

  return nil
}

func getProfile(id string, repo repository.ProfileRepository) (*model.Profile, error) {
  profile, err := repo.FindByID(id)

  if err != nil {
    return nil, err
  }

  return profile, nil
}

func getProfiles(repo repository.ProfileRepository) (model.Profiles, error) {
  profiles, err := repo.FindAll()

  if err != nil {
    return nil, err
  }

  return profiles, nil
}
