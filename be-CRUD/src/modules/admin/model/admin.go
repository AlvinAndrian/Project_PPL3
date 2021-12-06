package model

type Admin struct {
	ID int      
	Name string      
	Username string   
	Password string  
	Email string
	Phone int     
}

//Admins type adalah Admin list
type Admins []Admin

//NewAdmin adalah Constructor Admin
func NewAdmin() *Admin{
	return &Admin{
		
	}
}
