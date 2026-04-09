using BookApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.IO;

namespace BookApp.Servies
{
    public class JsonBookRepository : IBookRepository
    {
        private readonly string _filePath = "books.json";
        private List<Book> _books;
        private int _nextId = 1;

        public JsonBookRepository()
        {
            LoadData();
        }

        private void LoadData()
        {
            if (File.Exists(_filePath))
            {
                string json = File.ReadAllText(_filePath);
                _books = JsonSerializer.Deserialize<List<Book>>(json) ?? new List<Book>();
            }
            else
            {
                _books = new List<Book>();
                AddSampleData();
                SaveData();
            }

            if (_books.Any())
            {
                _nextId = _books.Max(b => b.Id) + 1;
            }
        }

        private void SaveData()
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string json = JsonSerializer.Serialize(_books, options);
            File.WriteAllText(_filePath, json);
        }

        private void AddSampleData()
        {
            _books.Add(new Book
            {
                Id = _nextId++,
                Title = "Война и мир",
                Author = "Лев Толстой",
                Genre = "Роман",
                Year = 1869
            });
            _books.Add(new Book
            {
                Id = _nextId++,
                Title = "Преступление и наказание",
                Author = "Федор Достоевский",
                Genre = "Драма",
                Year = 1866
            });
        }

        public List<Book> GetAll()
        {
            return _books;
        }

        public Book GetById(int id)
        {
            return _books.FirstOrDefault(b => b.Id == id);
        }

        public void Add(Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            SaveData();
        }

        public void Delete(int id)
        {
            var book = GetById(id);
            if (book != null)
            {
                _books.Remove(book);
                SaveData();
            }
        }

        public void Update(Book book)
        {
            var existing = GetById(book.Id);
            if (existing != null)
            {
                existing.Title = book.Title;
                existing.Author = book.Author;
                existing.Genre = book.Genre;
                existing.Year = book.Year;
                SaveData();
            }
        }
    }
}