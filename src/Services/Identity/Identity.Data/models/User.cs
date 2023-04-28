using System;

namespace Identity.Data.models
{
    public class User
    {
        public int Id { get; set; }
        
        public string Firstname { get; set; }
        
        public string Lastname { get; set; }
        
        public string UserName { get; set; }
        
        public string Password { get; set; }
        
        public bool IsActive { get; set; }
        
        public DateTime DateCreated { get; set; }
    }
}
