document.addEventListener('DOMContentLoaded', function() {
    const buttons = [
        { id: 'Madame_Web', movieId: 634492 },
        { id: 'The_Hobbit', movieId: 122917 },
        { id: 'Joker', movieId: 889737 }
    ];

    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener('click', function() {
            window.location.href = `/html/movie_detail.html?id=${button.movieId}`;
        });

        document.getElementById(`information_${button.id}`).addEventListener('click', function() {
            window.location.href = `/html/movie_detail.html?id=${button.movieId}`;
        });
    });
});
