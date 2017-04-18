(function (window) {
    //Toggle Option for on hover and on click event
    var options = {
        changeOnClick: true,
        changeOnHover: true
    };

    var activeProduct;

    // Image path to dist images
    var IMAGE_PATH = 'dist/images/';

    function displayProductItem(self, restoreProduct) {
        var dataObj = $(self).data('imageobj'); // Swatch thats clicked / hovered;

        // Check for mouse out/hover out effect to restore original active product
        if (restoreProduct !== 'undefined' && restoreProduct === true) {
            dataObj = activeProduct; // Current active swatch product
        }

        // Replace current active product image with new
        $('#product_thumbnail img').attr({
            'src': IMAGE_PATH + dataObj,
            'alt': dataObj,
            'title': dataObj,
            'data-currentproduct': dataObj
        })
    } //End of displayProductItem  

    function changeButtonState(self, text) {
        $(self).text(text);
    }

    $(document).ready(function () {
        // On Document Load, display first swatch item
        var firstSwatch = $('#swatches a:first-child');
        $('#product_thumbnail').prepend(
            $("<img></img>").attr({
                "src": IMAGE_PATH + firstSwatch.data('imageobj'),
                "alt": firstSwatch.data('imageobj'),
                "title": firstSwatch.attr("title"),
                'data-currentproduct': firstSwatch.data('imageobj')
            })
        ); // End of first image creation

        // Store current product shown into variable
        activeProduct = $('#product_thumbnail img').data('currentproduct');

        // Handle click event on swatches
        $('.swatch_color').on('click', this, function () {
            if (options.changeOnClick === true) {
                displayProductItem(this, false);
                activeProduct = $(this).data('imageobj');
                $(this).off("mouseleave");
            } // End of options.changeOnClick check
        });

        //Handles hovering on a swatch --- .hover(mouseon, mouseleave)
        $('.swatch_color').hover(
            function () {
                if (options.changeOnHover === true) {
                    displayProductItem(this, false);
                    $(this).on("mouseleave");
                }
            },
            function () {
                if (options.changeOnHover === true) {
                    displayProductItem(this, true);
                }
            }
        );

        // Following will handle the button inputs to see if click and hover event will be enabled or disabled
        $('#button_click').on('click', this, function () {
            if (options.changeOnClick === true) {
                changeButtonState(this, "Enable Click");
                options.changeOnClick = false;
            }
            else {
                changeButtonState(this, "Disable Click");
                options.changeOnClick = true;
            }
        });
        $('#button_hover').on('click', function () {
            if (options.changeOnHover === true) {
                changeButtonState(this, "Enable Hover");
                options.changeOnHover = false;
            }
            else {
                changeButtonState(this, "Disable Hover");
                options.changeOnHover = true;
            }
        });
    });
})(this);

