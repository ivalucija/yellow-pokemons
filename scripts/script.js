$(document).ready(function () {
  let pokemons = [];

  function getPokemonDetails(pokemon) {
    return $.ajax(pokemon.url, {
      success: function (data) {
        pokemons.push(data);
      },
    });
  }

  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon-color/yellow",
    success: function (response) {
      const slicedPokemons = response.pokemon_species.slice(0, 20);

      $.when
        .apply(
          $,
          slicedPokemons.map((pokemon) => {
            return getPokemonDetails(pokemon);
          })
        )
        .done(function (results) {
          const container = document.getElementById("pokemon-list").innerHTML;
          const template = Handlebars.compile(container);

          document.getElementById("template-area").innerHTML = template({
            pokemons,
          });
          afterTemplateLoad();
        });
    },
    error: (xhr, status, error) => {
      $("<div></div>")
        .insertAfter($("h1"))
        .text(`Greska prilikom dobavljanja podataka: ${status}`);
    },
  });

  $(window).resize(() => {
    console.log("Sirina ekrana:", $(window).width());
  });

  function addStripes() {
    $("table tr").removeClass("stripes");
    $("table tr:nth-child(odd)").addClass("stripes");
  }

  function afterTemplateLoad() {
    $("table thead tr th").css("color", "darkblue");

    $("table tr").on("mouseenter", (event) => {
      $(event.currentTarget).css("background-color", "azure");
    });
    $("table tr").on("mouseleave", (event) => {
      $(event.currentTarget).removeAttr("style");
    });

    addStripes();

    setTimeout(function () {
      const elementsToRemove = $("table tbody tr td a:contains('p')").filter(
        function () {
          return this.innerHTML.charAt(0) === "p";
        }
      );
      elementsToRemove.closest("tr").remove();
      addStripes();

      $("<div></div>")
        .insertBefore($("#pokemon-list"))
        .text(`Skriveno elemenata: ${elementsToRemove.length}`);
    }, 2000);
  }
});
