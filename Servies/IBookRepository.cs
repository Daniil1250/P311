using System.Collections.Generic;
using BookApp.Models;

namespace BookApp.Servies
{
    public interface IBookRepository
    {
        List<Book> GetAll();
        Book GetById(int id);
        void Add(Book book);
        void Delete(int id);
        void Update(Book book); // добавлено для будущих обновлений
    }
}