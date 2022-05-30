using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Safra.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonTypeController : ControllerBase
    {
        private static readonly string[] DescriptionsPersonTypes = new[]
        {
             "Física", "Jurídica",
        };
        [HttpGet]
        public IEnumerable<PersonType> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 2).Select(index => new PersonType
            {
                Id = index,
                Description = DescriptionsPersonTypes[rng.Next(DescriptionsPersonTypes.Length)],
            }).ToArray();
        }
    }
}
