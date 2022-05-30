using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Safra.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CreditsController : ControllerBase
    {
        private static readonly string[] Descriptions = new[]
        {
            "Crédito Direto", "Crédito Consignado", "Crédito Pessoa Jurídica", "Crédito Pessoa Física","Crédito Imobiliário",
        };
        private static readonly int[] Taxe = new[]
        {
            2, 1, 5, 3,9
        };

        [HttpGet]
        public IEnumerable<TypesOfCredits> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new TypesOfCredits
            {
                Id = index,
                Description = Descriptions[rng.Next(Descriptions.Length)],
                Taxes = Taxe[rng.Next(Taxe.Length)]
            }).ToArray();
        }
    }
}
