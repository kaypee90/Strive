using System.Threading.Tasks;
using Dapper;
using Identity.Data.models;
using Microsoft.Data.Sqlite;

namespace Identity.Data.Repositories
{
    public class UserRepository
    {
        private const string _databaseName = "identity.db";
        
        public async Task<bool> CreateUser(User user)
        {
            using var connection = new SqliteConnection(_databaseName);
 
            await connection.ExecuteAsync(
                "INSERT INTO Product (Firstname, Lastname, UserName, Password, IsActive, DateCreated)" +
                                          "VALUES (@Firstname, @Lastname, @UserName, @Password, @IsActive, @DateCreated);", user);
            return true;
        }

        public bool ValidateCredentials(string username, string password)
        {
            
        }

        public User FindByUsername(string username)
        {
            
        }
    }
}
