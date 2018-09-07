using Circolare2018.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Circolare2018.BL
{
    public static class ResourceManager
    {
        public static List<Entities.RESOURCE> GetAllResources()
        {
            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            return repo.GetAll().ToList();
        }

        public static Entities.RESOURCE GetResource(int Id)
        {
            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            return repo.Find(x => x.ID == Id).FirstOrDefault();
        }

        public static bool UpdateResource(Entities.RESOURCE resourceToUpdate)
        {
            bool resultOperation = false;

            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            Entities.RESOURCE mod = repo.FindNoTracking(x => x.ID == resourceToUpdate.ID).FirstOrDefault();

            if (mod != null)
            {
                try
                {
                    repo.Update(resourceToUpdate);
                    DAL.GlobalUnitOfWork.Commit();
                    resultOperation = true;
                }
                catch (Exception ex)
                {
                    //Inserire LOG
                    resultOperation = false;
                }
            }

            return resultOperation;
        }

        public static bool InsertResource(Entities.RESOURCE resourceToInsert)
        {
            bool resultOperation = false;

            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            Entities.RESOURCE exists = repo.FindNoTracking(x => x.ID == resourceToInsert.ID).FirstOrDefault();

            if (exists == null)    //check if already exists
            {
                try
                {
                    resourceToInsert.UserName = ResourceManager.SetUsername(resourceToInsert.Name, resourceToInsert.Surname);
                    repo.Add(resourceToInsert);
                    DAL.GlobalUnitOfWork.Commit();
                    resultOperation = true;
                }
                catch (Exception ex)
                {
                    //Inserire LOG
                    resultOperation = false ;
                }
            }

            return resultOperation;
        }

        public static bool RemoveResource(int Id)
        {
            bool resultOperation = false;

            EFRepository<Entities.RESOURCE> repo = new EFRepository<Entities.RESOURCE>();
            EFRepository<Entities.SUBSCRIPTION> repoSub = new EFRepository<Entities.SUBSCRIPTION>();

            Entities.RESOURCE exists = repo.FindNoTracking(x => x.ID == Id).FirstOrDefault();
            List<Entities.SUBSCRIPTION> subCPList = repoSub.FindNoTracking(s => s.ID_CP == Id).ToList();

            if (exists != null)
            {
                try
                {
                    repo.Delete(exists);

                    //cancello anche le sottoscrizioni confermate dalla risorsa rimossa, se è CP
                    foreach (Entities.SUBSCRIPTION sub in subCPList)
                    {
                        repoSub.Delete(sub);
                    }

                    DAL.GlobalUnitOfWork.Commit();
                    resultOperation = true;
                }
                catch (Exception ex)
                {
                    //Inserire LOG
                    resultOperation = false;
                }
               
            }

            return resultOperation;
        }


        private static string SetUsername(string _name, string _surname)
        {
            string userName = null;

            using (Entities.DB_SiWeb3Entities context = new Entities.DB_SiWeb3Entities())
            {
                userName = context.SetUserName(_name,_surname).FirstOrDefault();
            }

            return userName;
        }
    }
}
