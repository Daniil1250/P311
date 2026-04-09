using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BookApp.Models;
using BookApp.Servies;

namespace BookApp.Pages.Books
{
    public class CreateModel : PageModel
    {
        private readonly IBookRepository _repository;

        public CreateModel(IBookRepository repository)
        {
            _repository = repository;
        }

        [BindProperty]
        public Book Book { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
                return Page();

            _repository.Add(Book);

            return RedirectToPage("./Index");
        }
    }
}