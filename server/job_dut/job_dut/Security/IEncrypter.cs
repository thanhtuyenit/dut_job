namespace job_dut.Security
{
    public interface IEncrypter
    {
        string GetHash(string value, string salt);
        string GetSalt();
    }
}