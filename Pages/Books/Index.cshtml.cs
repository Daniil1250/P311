using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BookApp.Models;
using BookApp.Servies;
using System.Collections.Generic;
using System.Linq;

namespace BookApp.Pages.Books
{
    public class IndexModel : PageModel
    {
        private readonly IBookRepository _repository;

        public List<Book> Books { get; set; }

        public IndexModel(IBookRepository repository)
        {
            _repository = repository;
        }

        public void OnGet()
        {
            Books = _repository.GetAll();
        }
    }
}