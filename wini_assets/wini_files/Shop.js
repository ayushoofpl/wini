/**
 * Shop-Object
 * Thomas Deuling <typo3@Coding.ms>
 * 2013-08-27 - Muenster/Germany
 */
var Shop = {

    /**
     * Debug JavaScripts
     */
    debug: false,

    /**
     * Selected filter
     */
    filter: {
        tags: []
    },

    /**
     * Reminds if events on basket are already bound
     */
    basketEventsBound: false,

    /**
     * Initiate the shop object
     */
    initialize: function () {
        var shopContainer = jQuery('.tx-shop');
        if (shopContainer.length > 0) {
            //
            // Debugging
            Shop.debug = (shopContainer.attr('data-shop-debug') === '1');
            if (Shop.debug) {
                Logger.enableLogger();
            }
            //
            // Add to basket buttons
            this.initializeProductBasketEvents();
            this.animateSpinner();

            // Add aligning behavior of category checkboxes and related tag checkboxes
            this.alignCategoryAndTagsCheckboxes();
            //
            // Initialize the global basket button
            Shop.updateBasketButtonQuantity(parseInt(jQuery('.basket-item-count').html(), 10));
            //
            // Hide/show delivery address fields
            var deliveryAddressEnabledCheckbox = jQuery('#checkout_deliveryAddressEnabled');
            if (deliveryAddressEnabledCheckbox.length) {
                deliveryAddressEnabledCheckbox.change(function () {
                    var deliveryAddressFields = jQuery('.shop-basketorder-checkout .deliveryAddress');
                    if (jQuery(this).prop('checked')) {
                        deliveryAddressFields.slideDown(250);
                    } else {
                        deliveryAddressFields.slideUp(250);
                    }
                });
                if (!deliveryAddressEnabledCheckbox.prop('checked')) {
                    jQuery('.shop-basketorder-checkout .deliveryAddress').slideUp(0);
                }
            }
            //
            // Hide/show password fields
            var createFrontendUserEnabledCheckbox = jQuery('#checkout_createFrontendUser');
            if (createFrontendUserEnabledCheckbox.length) {
                createFrontendUserEnabledCheckbox.change(function () {
                    var passwordFields = jQuery('.shop-basketorder-checkout .password');
                    if (jQuery(this).prop('checked')) {
                        passwordFields.slideDown(250);
                    } else {
                        passwordFields.slideUp(250);
                    }
                });
                if (!createFrontendUserEnabledCheckbox.prop('checked')) {
                    jQuery('.shop-basketorder-checkout .password').slideUp(0);
                }
            }
        }
        //
        // Prevent double click on submit buttons, for example the checkout confirm page!!
        jQuery('.shop-basketorder-confirm-order button[type=\'submit\']').on('click', function() {
            jQuery(this).prop('disabled', true);
            jQuery(this).closest('form').submit();
        });
        //
        // Manipulate inputs for fixing submit search/reset
        jQuery('button[name="tx_shop_products[reset]"]').on('click', function() {
            jQuery('input[name="tx_shop_products[submit]"]').attr('name', 'tx_shop_products[reset]');
            jQuery(this).closest('form').submit();
        });
        //
        /**
         * @todo initialize only when activated by data-shop-bookmark=1
         */
        this.bookmarks.initialize();
        //
        // In case of basket page
        var basketContent = jQuery('.basket-item-list.table');
        if (basketContent.length > 0) {
            var editable = basketContent.attr('data-editable');
            this.initializeBasket(editable);
        }
        //
        // Initialize Isotope, if required
        this.isotope.instance = jQuery('.tx-shop [data-isotope]');
        if (this.isotope.instance.length > 0) {
            Shop.isotope.initialize();
        } else {
            //
            // Sort by
            var sortBy = jQuery('#product-list-sort-by');
            if (sortBy.length > 0) {
                sortBy.on('change', function() {
                    jQuery(this).closest('form').submit();
                });
            }
            // Sort order
            var sortOrder = jQuery('#product-list-sort-order');
            if (sortOrder.length > 0) {
                sortOrder.on('change', function() {
                    jQuery(this).closest('form').submit();
                });
            }
        }
        this.initProductListLazyLoad();
        //
        // Initialize payment provider
        this.initPayPalCheckout();
        this.initKlarna();
        this.initStripe();
    },

    initializeProductBasketEvents: function () {
        jQuery('*[data-add-to-basket]').off().on('click', function () {
            var button = jQuery(this);
            var wrapper = button.closest('.product-add-to-basket');
            var productUid = parseInt(button.attr('data-add-to-basket'), 10);
            var field = wrapper.find('.product-add-to-basket-quantity');
            var quantity = parseInt(field.val(), 10);
            Shop.addToBasket(productUid, quantity);
        });
    },

    initProductListLazyLoad: function() {
        const self = this;
        const $productsWrapper = jQuery('#product-list');
        const $productSearchForm = jQuery('#product-searchform');
        if ($productsWrapper.length !== 0 && $productSearchForm.length !== 0) {
            if ($productsWrapper.data('endless-scrolling')) {
                const params = $productsWrapper.data('params');
                if (params) {
                    let isLoading = false;

                    const scrollListener = function() {
                        const productsWrapperBottom = $productsWrapper.offset().top + $productsWrapper.outerHeight();
                        const currentScrollPosition = window.scrollY;
                        const viewportHeight = window.innerHeight;

                        if (currentScrollPosition + viewportHeight >= productsWrapperBottom && !isLoading) {
                            params['offset'] = $productsWrapper.find('.product-item').length;
                            params['json'] = 1;

                            data = {};
                            for (const key of Object.keys(params)) {
                                if (key === 'controller') {
                                    data[key] = params[key];
                                } else {
                                    data['tx_shop_products[' + key + ']'] = params[key];
                                }
                            }

                            jQuery('#product-load-spinner').show();

                            isLoading = true;
                            jQuery.ajax({
                                type: 'POST',
                                url: $productSearchForm.attr('action'),
                                data: data,
                                success: function (html, textStatus, request) {
                                    jQuery('#product-load-spinner').hide();
                                    const $elementsToAppend = jQuery(html).find('[data-endless-scrolling-element]')
                                    const $endlessScrollWrapper = $productsWrapper.find('[data-endless-scroll-wrapper]');
                                    if (Shop.isotope.instance[0] === $endlessScrollWrapper[0]) {
                                        $endlessScrollWrapper.append($elementsToAppend).isotope('appended', $elementsToAppend);
                                    } else {
                                        $endlessScrollWrapper.append($elementsToAppend);
                                    }
                                    jQuery('#product-load-spinner').appendTo($productsWrapper.find('[data-endless-scroll-wrapper]'));
                                    isLoading = false;
                                    if ($elementsToAppend.length === 0) {
                                        window.removeEventListener('scroll', scrollListener);
                                    }
                                    setTimeout(() => {
                                        self.initializeProductBasketEvents();
                                        self.bookmarks.initialize();
                                        jQuery.event.trigger('shop.after_list_lazy_load_items');
                                    }, 200);
                                }
                            });
                        }
                    }
                    window.addEventListener('scroll', scrollListener);
                }
            }
        }
    },

    initPayPalCheckout: function () {
        var pppWrapper = document.querySelector('#paypal-checkout-wrapper');
        if (pppWrapper !== null) {
            var loaderWrapper = pppWrapper.querySelector('.loader-wrapper');
            var doCheckoutButton = document.querySelector('#paypal-checkout-do-checkout-button');
            var orderID = pppWrapper.getAttribute('data-pay-pal-order-id');


            var layout = pppWrapper.getAttribute('data-pay-pal-layout');
            var color = pppWrapper.getAttribute('data-pay-pal-color');
            var shape = pppWrapper.getAttribute('data-pay-pal-shape');
            var label = pppWrapper.getAttribute('data-pay-pal-label');
            var style = {
                layout: layout,
                color:  color,
                shape:  shape,
                label:  label
            };
            if (Shop.debug) {
                Logger.log('Shop.initPayPalCheckout');
            }
            //
            // Documentation: https://developer.paypal.com/sdk/js/reference/
            paypal.Buttons({
                onInit(data, actions) {
                    loaderWrapper.remove();
                },
                onApprove(data, actions) {
                    // Payment seems to be successfully performed
                    doCheckoutButton.classList.remove('disabled');
                    // Hide PayPal buttons
                    pppWrapper.style.display = 'none';
                },
                createOrder: function() {
                    // Initialize payment using the prepared order-payment from backend
                    // PayPalCheckoutCheckoutService getPaymentResource
                    return orderID;
                },
                style: style
            }).render('#paypal-checkout-wrapper');
        }
    },

    initStripe: function () {
        var stripeWrapper = jQuery('#stripe-wrapper');
        var loaderWrapper = stripeWrapper.find('.loader-wrapper');
        loaderWrapper.remove()

        if (stripeWrapper.length !== 0) {
            const options = {
                clientSecret: stripeWrapper.attr('data-stripe-client-secret'),
            };
            //
            // Stripe API Key
            var stripe = Stripe(stripeWrapper.attr('data-stripe-public-key'), options);
            var elements = stripe.elements(options);

            const paymentElement = elements.create('payment');
            // Add an instance of the card Element into the `card-element` <div>
            paymentElement.mount('#payment-element');
            //
            // Handle form submission
            var form = jQuery('#payment-form');
            form.on('submit', function (event) {
                event.preventDefault();
                stripeWrapper.append(loaderWrapper)
                form.find('button').prop('disabled', true);

                stripe.confirmPayment({
                    //`Elements` instance that was used to create the Payment Element
                    elements,
                    confirmParams: {
                        return_url: stripeWrapper.attr('data-stripe-return-url'),
                    },
                }).then(function(result) {
                    if (result.error) {
                        // This point will only be reached if there is an immediate error when
                        // confirming the payment. Show error to your customer (for example, payment
                        // details incomplete)
                        const messageContainer = stripeWrapper.find('#error-message');
                        messageContainer.text(result.error.message);
                        loaderWrapper.remove()
                        form.find('button').prop('disabled', false);
                    } else {
                        // Your customer will be redirected to your `return_url`. For some payment
                        // methods like iDEAL, your customer will be redirected to an intermediate
                        // site first to authorize the payment, then redirected to the `return_url`.
                        const messageContainer = stripeWrapper.find('#error-message');
                        messageContainer.text('');
                    }
                });
            });
        }
    },

    initKlarna: function () {
        var klarnaWrapper = jQuery('#klarna-wrapper');
        if (klarnaWrapper.length !== 0) {
            var initFunction = function () {
                var locale = jQuery('html').attr('lang');
                if (typeof locale !== 'string' || locale === '') {
                    locale = 'en-US';
                }
                Klarna.Payments.init({
                    client_token: klarnaWrapper.attr('data-klarna-client-token')
                })
                Klarna.Payments.load({
                    container: '#klarna-payments-container',
                    payment_method_category: klarnaWrapper.attr('data-klarna-payment-method-category')
                }, {
                    locale: locale
                }, function (res) {
                    if (!(typeof res['error'] === 'undefined')) {
                        FlashMessage.push(res['error'], 'danger', '#shop-flash-messages');
                    }
                    if (res['show_form']) {
                        jQuery('#klarna-do-checkout-button').removeClass('disabled');
                    }
                });
            }
            //
            // Execute initialization by Klarna callback,
            // or if Klarna callback were already executed, initialize immediately.
            if (klarnaWrapper.attr('data-klarna-async-callback') === 'waiting') {
                window.klarnaAsyncCallback = initFunction;
            } else {
                initFunction();
            }
        }
    },

    confirmKlarna: function () {
        var klarnaWrapper = jQuery('#klarna-wrapper');
        try {
            Klarna.Payments.authorize({
                payment_method_category: klarnaWrapper.attr('data-klarna-payment-method-category')
            }, function (res) {
                if (res['approved'] && !(typeof res['authorization_token'] === 'undefined')) {
                    // Payment successfully authorized
                    var authorizationTokenField = jQuery('#authorization-token');
                    if (authorizationTokenField.length > 0) {
                        authorizationTokenField.val(res['authorization_token']);
                        authorizationTokenField.closest('form').submit();
                    } else {
                        FlashMessage.push('#authorization-token field not found!', 'danger', '#shop-flash-messages');
                    }
                } else {
                    FlashMessage.push('Klarna authorization failed!', 'danger', '#shop-flash-messages');
                }
            })
        } catch (e) {
            // Handle error. The authorize~callback will have been called
            // with "{ show_form: false, approved: false }" at this point.
            // console.log('confirm e', e);
            FlashMessage.push('Klarna authorization error!', 'danger', '#shop-flash-messages');
        }
    },

    bindBasketEvents: function () {
        //
        // Bind events for changing the quantity
        jQuery('input.basket-item-quantity').on('keydown', function (event) {
            if (event.key === 'Enter') {
                return false;
            }
        }).on('keyup', function (event) {
            var basketItem = jQuery(this).closest('tr.basket-item');
            if (event.key === 'Enter') {
                var product = basketItem.data('product-uid');
                var quantity_input = jQuery('input.basket-item-quantity', basketItem);
                var quantity = quantity_input.val();
                quantity = parseInt(quantity, 10);
                if (isNaN(quantity) || quantity === 0) {
                    FlashMessage.push(quantity_input.attr('data-quantity-empty-message'), 'danger', '#shop-flash-messages');
                    return false;
                }
                Shop.updateBasketItemQuantity(product, quantity);
                this.blur();
            } else {
                Shop.checkQuantityChanged(basketItem);
            }
            return false;
        }).on('blur', function () {
            var basketItem = jQuery(this).closest('tr.basket-item');
            Shop.checkQuantityChanged(basketItem);
            return false;
        });
        //
        // Basket item update button event
        jQuery('.basket-item-unit-save').on('click', function () {
            // Get basket item
            var basketItem = jQuery(this).closest('tr.basket-item');
            var product = basketItem.data('product-uid');
            var quantity_input = jQuery('input.basket-item-quantity', basketItem);
            var quantity = quantity_input.val();
            quantity = parseInt(quantity, 10);
            if (isNaN(quantity) || quantity === 0) {
                FlashMessage.push(quantity_input.attr('data-quantity-empty-message'), 'danger', '#shop-flash-messages');
                return false;
            }
            Shop.updateBasketItemQuantity(product, quantity, quantity_input);
            return false;
        });
        //
        // Bind events for changing the quantity
        jQuery('input.basket-item-custom-information').on('keydown', function (event) {
            if (event.key === 'Enter') {
                return false;
            }
        }).on('keyup', function (event) {
            var basketItem = jQuery(this).closest('tr.basket-item');
            if (event.key === 'Enter') {
                var product = basketItem.data('product-uid');
                var customInformation_input = jQuery('input.basket-item-custom-information', basketItem);
                var customInformation = customInformation_input.val();
                if (customInformation === '') {
                    FlashMessage.push(customInformation_input.attr('data-custom-information-empty-message'), 'danger', '#shop-flash-messages');
                    return false;
                }
                Shop.updateBasketItemCustomInformation(product, customInformation, customInformation_input);
                this.blur();
            } else {
                Shop.checkCustomInformationChanged(basketItem);
            }
            return false;
        }).on('blur', function () {
            var basketItem = jQuery(this).closest('tr.basket-item');
            Shop.checkCustomInformationChanged(basketItem);
            return false;
        });
        //
        // Basket item update button event
        jQuery('.basket-item-custom-information-save').on('click', function () {
            // Get basket item
            var basketItem = jQuery(this).closest('tr.basket-item');
            var product = basketItem.data('product-uid');
            var customInformation_input = jQuery('input.basket-item-custom-information', basketItem);
            var customInformation = customInformation_input.val();
            if (customInformation === '') {
                FlashMessage.push(customInformation_input.attr('data-custom-information-empty-message'), 'danger', '#shop-flash-messages');
                return false;
            }
            Shop.updateBasketItemCustomInformation(product, customInformation, customInformation_input);
            return false;
        });
    },

    /**
     * Initialize the basket content
     */
    initializeBasket: function (editable) {
        var data = {
            tx_shop_jsonapi: {
                initialize: 1,
                editable: editable
            }
        };
        jQuery.ajax({
            url: jQuery('.tx-shop').attr('data-shop-update-basket-item-json-api'),
            data: data,
            dataType: 'json',
            method: 'POST',
            success: function (json) {
                if (json.status === 'success') {
                    var html = atob(json.html);
                    html = decodeURIComponent(escape(html));
                    jQuery('.basket-item-list.table').text('').replaceWith(html);
                    Shop.bindBasketEvents();
                    Shop.updateBasketOrderButtons(json);
                } else {
                    FlashMessage.push(json.messages.danger, 'danger', '#shop-flash-messages');
                }
            },
            error: function () {
                //alert("Error: "+url+productId);
            }
        });

    },

    /**
     * Change basket item quantity
     */
    updateBasketItemQuantity: function (product, quantity, quantity_input) {
        //
        var data = {
            tx_shop_jsonapi: {
                quantity: quantity,
                product: product,
                editable: 1
            }
        };
        // Send AJAX request
        jQuery.ajax({
            url: jQuery('.tx-shop').attr('data-shop-update-basket-item-json-api'),
            dataType: 'json',
            data: data,
            method: 'POST',
            success: function (json) {
                if (typeof quantity_input !== 'undefined') {
                    quantity_input.val(json.quantity);
                }
                if (json.status === 'success') {
                    var html = atob(json.html);
                    html = decodeURIComponent(escape(html));
                    jQuery('.basket-item-list.table').text('').replaceWith(html);
                    Shop.bindBasketEvents();
                    Shop.updateBasketOrderButtons(json);
                    FlashMessage.push(json.messages.ok, 'success', '#shop-flash-messages');
                } else {
                    FlashMessage.push(json.messages.danger, 'danger', '#shop-flash-messages');
                }
            },
            error: function () {
                //alert("Error: "+url+productId);
            }
        });
        return false;
    },

    /**
     * Change basket item custom information
     */
    updateBasketItemCustomInformation: function (product, customInformation, customInformation_input) {
        //
        var data = {
            tx_shop_jsonapi: {
                customInformation: customInformation,
                product: product,
                editable: 1
            }
        };
        // Send AJAX request
        jQuery.ajax({
            url: jQuery('.tx-shop').attr('data-shop-update-basket-item-json-api'),
            dataType: 'json',
            data: data,
            method: 'POST',
            success: function (json) {
                if (json.status === 'success') {
                    FlashMessage.push(json.messages.ok, 'success', '#shop-flash-messages');
                } else {
                    FlashMessage.push(json.messages.danger, 'danger', '#shop-flash-messages');
                }
            },
            error: function () {
                //alert("Error: "+url+productId);
            }
        });
        return false;
    },

    updateBasketOrderButtons: function(json) {
        if (!json.minimumOrderValueReached) {
            jQuery('.btn-order').addClass('disabled');
        } else {
            jQuery('.btn-order').removeClass('disabled');
        }
        jQuery.each(jQuery('.btn-order'), function() {
            var orderButton = jQuery(this);
            var minimumOrderValue = parseInt(orderButton.data('minimum-order-value'), 10);
            var maximumOrderValue = parseInt(orderButton.data('maximum-order-value'), 10);
            if (minimumOrderValue > 0 || maximumOrderValue > 0) {
                if (json.orderValue < minimumOrderValue || json.orderValue > maximumOrderValue) {
                    orderButton.addClass('disabled');
                } else {
                    orderButton.removeClass('disabled');
                }
            }
        });
    },

    checkQuantityChanged: function (basketItem) {
        // Get quantity
        var quantityField = jQuery('input.basket-item-quantity', basketItem).val();
        var quantity = parseInt(quantityField, 10);
        // Get original quantity
        var quantityOriginalField = jQuery('input.basket-item-quantity-original', basketItem).val();
        var quantityOriginal = parseInt(quantityOriginalField, 10);
        //
        if (quantity !== quantityOriginal && quantity > 0) {
            jQuery('.basket-item-unit', basketItem).hide();
            jQuery('.basket-item-unit-save', basketItem).show();
        }
    },

    checkCustomInformationChanged: function (basketItem) {
        // Get custom information
        var customInformation_input = jQuery('input.basket-item-custom-information', basketItem);
        var customInformation = customInformation_input.val();
        var customInformationOriginal = jQuery('input.basket-item-custom-information-original', basketItem).val();
        if (customInformation_input.attr('data-custom-information-type') === 'int') {
            var customInformation = parseInt(customInformation, 10);
            var customInformationOriginal = parseInt(customInformationOriginal, 10);
            if (customInformation !== customInformationOriginal && customInformation > 0) {
                jQuery('.basket-item-custom-information-save', basketItem).removeAttr('disabled');
                if (customInformation_input.attr('data-custom-information-required') === '1') {
                    customInformation_input.removeClass('border-danger');
                }
            } else {
                if (customInformation_input.attr('data-custom-information-required') === '1') {
                    customInformation_input.addClass('border-danger');
                }
            }
        } else {
            //
            if (customInformation !== customInformationOriginal && customInformation !== '') {
                jQuery('.basket-item-custom-information-save', basketItem).removeAttr('disabled');
                if (customInformation_input.attr('data-custom-information-required') === '1') {
                    customInformation_input.removeClass('border-danger');
                }
            } else {
                if (customInformation_input.attr('data-custom-information-required') === '1') {
                    customInformation_input.addClass('border-danger');
                }
            }
        }
    },

    /**
     * Add a product to basket
     */
    addToBasket: function (product, quantity) {
        // Validate quantity
        if (isNaN(quantity) || quantity === 0) {
            FlashMessage.push('Bitte geben Sie erst eine Anzahl ein!', 'error', '#shop-flash-messages');
            return false;
        }
        //
        var data = {
            tx_shop_jsonapi: {
                quantity: quantity,
                product: product
            }
        };
        // Send AJAX request
        jQuery.ajax({
            url: jQuery('.tx-shop').attr('data-shop-add-basket-item-json-api'),
            dataType: 'json',
            data: data,
            method: 'POST',
            success: function (json) {
                // Set the new basket item amount
                Shop.updateBasketButtonQuantity(parseInt(json.basketItemQuantity, 10));
                // Display a message
                if (json.status === 'success') {
                    FlashMessage.push(json.messages.ok, 'success', '#shop-flash-messages');
                } else {
                    FlashMessage.push(json.messages.danger, 'danger', '#shop-flash-messages');
                }
            },
            error: function () {
                //alert("Error: "+url+productId);
            }
        });
        return false;
    },

    /**
     * Updates the global basket button
     * @param quantity
     */
    updateBasketButtonQuantity: function (quantity) {
        if (isNaN(quantity) || quantity === 0) {
            quantity = 0;
        }
        if (quantity === 1) {
            jQuery('.basket-item-label.singular').show();
            jQuery('.basket-item-label.plural').hide();
        } else {
            jQuery('.basket-item-label.singular').hide();
            jQuery('.basket-item-label.plural').show();
        }
        const $countElement = jQuery('.basket-item-count')
        $countElement.html(quantity);
        $countElement.attr('data-count', quantity);
    },

    /**
     * JavaScript history back
     */
    goBackAndRefresh: function () {
        if ('referrer' in document) {
            window.location = document.referrer;
        } else {
            window.history.back();
        }
    },

    animateSpinner: function() {
        const dots = document.querySelectorAll('.preloader-dots .dot');
        const duration = 1800;
        const delayBetweenDots = 200;
        function animate(timestamp) {
            dots.forEach((dot, index) => {
                const delay = delayBetweenDots * index;
                const progress = ((timestamp + delay) % duration) / duration;
                const scale = Math.abs(Math.sin(progress * Math.PI));
                dot.style.transform = `scale(${scale})`;
            });
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    },

    alignCategoryAndTagsCheckboxes: function () {
        // initially align categorycheckboxes to tagcheckboxes
        const categoryCheckboxes = $('input[type="checkbox"][id*="product-category"]');

        for (let categoryCheckbox of categoryCheckboxes) {
            const mainDiv = $(categoryCheckbox).closest('.product-filter-tag-categorized');
            let allCheckboxesChecked = true;
            const tagCheckboxes = mainDiv.find('input[type="checkbox"][id*="product-tag"]');
            if (tagCheckboxes) {
                for (let checkbox of tagCheckboxes) {
                    if (!checkbox.checked) {
                        allCheckboxesChecked = false;
                        break;
                    }
                }
                categoryCheckbox.checked = allCheckboxesChecked;
            }
        }

        // align category-tag checkboxes when clicked on category checkbox
        categoryCheckboxes.on("change", function () {
            const isChecked = $(this).is(":checked");
            const mainDiv = $(this).closest('.product-filter-tag-categorized');
            const tagCheckboxes = mainDiv.find('input[type="checkbox"][id*="product-tag"]');
            for (let checkbox of tagCheckboxes) {
                checkbox.checked = isChecked;
            }
        });

        // align category checkbox when clicked on tag checkboxes. Check if all or not all tag checkboxes are checked
        const tagCheckboxes = $('input[type="checkbox"][id*="product-tag"]');
        tagCheckboxes.on("change", function () {
            const isChecked = $(this).is(":checked");
            const mainDiv = $(this).closest('.product-filter-tag-categorized');
            const categoryCheckbox = mainDiv.find('input[type="checkbox"][id*="product-category"]')[0];

            if (categoryCheckbox) {
                if (!isChecked) {
                    categoryCheckbox.checked = false;
                } else {
                    const tagCheckboxesOfCategory = mainDiv.find('input[type="checkbox"][id*="product-tag"]');
                    let allCheckboxesChecked = true;
                    for (let checkbox of tagCheckboxesOfCategory) {
                        if (!checkbox.checked) {
                            allCheckboxesChecked = false;
                            break;
                        }
                    }
                    categoryCheckbox.checked = allCheckboxesChecked;
                }
            }
        });
    },

    /**
     * Isotope configuration
     */
    isotope: {

        /**
         * Isotope instance, if available
         */
        instance: null,

        /**
         * Sort by
         */
        sortBy: 'title',

        /**
         * Sort order
         */
        sortOrder: 'asc',

        /**
         * Initialize Isotope
         */
        initialize: function () {
            Logger.log('Shop.isotope.initialize');
            // Product tags
            var tagCheckboxes = jQuery('[data-product-tag] input[type=\'checkbox\']');
            if (tagCheckboxes.length > 0) {
                // Restore tag filter settings
                jQuery.each(tagCheckboxes, function () {
                    var checkbox = jQuery(this);
                    if (checkbox.prop('checked')) {
                        var parent = 0;
                        var categorized = checkbox.closest('.product-filter-tag-categorized');
                        var filterConcatenation = checkbox.attr('data-filter-concatenation');
                        Logger.log('Tag checkbox filter concatenation: ', filterConcatenation, ', categorized: ', categorized);
                        if (categorized.length > 0) {
                            var tagCategory = jQuery('.product-tag-category input[type=\'checkbox\']', categorized);
                            parent = parseInt(tagCategory.val(), 10);
                            tagCategory.prop('checked', true);
                        }
                        Shop.isotope.filter.activate(checkbox.val(), filterConcatenation, parent, false);
                    }
                });
                Shop.isotope.refresh();
                // On change events
                tagCheckboxes.change(function () {
                    var checkbox = jQuery(this);
                    var parent = 0;
                    var categorized = checkbox.closest('.product-filter-tag-categorized');
                    var filterConcatenation = checkbox.attr('data-filter-concatenation');
                    Logger.log('Tag checkbox filter concatenation: ', filterConcatenation, ', categorized: ', categorized);
                    if (categorized.length > 0) {
                        var tagCategory = jQuery('.product-tag-category input[type=\'checkbox\']', categorized);
                        Logger.log('tagCategory', tagCategory);
                        parent = parseInt(tagCategory.val(), 10);
                        // Activate category checkbox
                        if (jQuery('[data-product-tag] input[type=\'checkbox\']:checked', categorized).length > 0) {
                            tagCategory.prop('checked', true);
                        } else {
                            tagCategory.prop('checked', false);
                        }
                    }
                    // Checkbox is selected?
                    if (checkbox.prop('checked')) {
                        Shop.isotope.filter.activate(checkbox.val(), filterConcatenation, parent, true);
                    } else {
                        // Unset tag category
                        var category = checkbox.closest('.product-filter-tag-category');
                        category = jQuery('[data-product-tag-category] input[type=\'checkbox\']', category);
                        // ..but only if available
                        if (category.length > 0) {
                            // ..and only when checked
                            if (category.prop('checked')) {
                                category.prop('checked', false);
                            }
                        }
                        // Unset tag
                        Shop.isotope.filter.deactivate(checkbox.val(), parent, true);
                    }
                });
            }
            // Product tag categories
            var tagCategoryCheckboxes = jQuery('[data-product-tag-category] input[type=\'checkbox\']');
            if (tagCategoryCheckboxes.length > 0) {
                // Restore tag filter settings
                jQuery.each(tagCategoryCheckboxes, function () {
                    var checkbox = jQuery(this);
                    if (checkbox.prop('checked')) {
                        Shop.isotope.filter.selected.push('.product-tag-category-' + checkbox.val());
                    }
                });
                // On change events
                tagCategoryCheckboxes.change(function () {
                    var filter = jQuery(this);
                    var parent = 0;
                    var categorized = filter.closest('.product-filter-tag-categorized');
                    if (filter.prop('checked')) {
                        // Add checked
                        jQuery.each(jQuery('[data-product-tag] input[type=\'checkbox\']', categorized), function () {
                            jQuery(this).prop('checked', true).trigger('change', false);
                        });
                    } else {
                        // Remove checked
                        jQuery.each(jQuery('[data-product-tag] input[type=\'checkbox\']', categorized), function () {
                            jQuery(this).prop('checked', false).trigger('change', false);
                        });
                    }
                    Shop.isotope.refresh();
                });
            }
            // Set filter
            Shop.isotope.filter.selected = jQuery.unique(Shop.isotope.filter.selected);
            Shop.isotope.filter.selectedString = Shop.isotope.filter.selected.join(', ');
            // Sort by
            var sortBy = jQuery('#product-list-sort-by');
            if (sortBy.length > 0) {
                sortBy.change(Shop.isotope.refresh);
            }
            // Sort order
            var sortOrder = jQuery('#product-list-sort-order');
            if (sortOrder.length > 0) {
                sortOrder.change(Shop.isotope.refresh);
            }
        },

        refresh: function () {
            var sortBy = jQuery('#product-list-sort-by');
            var sortOrder = jQuery('#product-list-sort-order');
            Logger.log('Shop.isotope.refresh: ', sortBy, sortOrder);
            if (sortOrder.length > 0 && sortBy.length > 0) {
                Logger.log('Shop.isotope.refresh: ', sortBy.val(), ', order asc: ', (sortOrder.val() === 'asc'));
                Shop.isotope.instance.isotope({
                    filter: Shop.isotope.filter.get(),
                    getSortData: {
                        title: '[data-isotope-sortby-title]',
                        product_no: '[data-isotope-sortby-product-no]',
                        price: function (item) {
                            return parseFloat(jQuery(item).find(".product-price").attr('data-isotope-sortby-price'));
                        },
                        sorting: function (item) {
                            return parseInt(jQuery(item).attr('data-isotope-sortby-sorting'), 10);
                        }
                    },
                    sortBy: sortBy.val(),
                    sortAscending: (sortOrder.val() === 'asc')
                });
                Shop.isotope.instance.isotope('updateSortData').isotope();

            } else {
                Shop.isotope.instance.isotope({filter: Shop.isotope.filter.get()});
            }
        },

        /**
         * Isotope filter
         */
        filter: {

            activated: {},
            activatedString: '',
            selected: [],
            selectedString: '',

            /**
             * Activate a filter setting
             * @param value
             * @param concatenation
             * @param parent
             * @param refresh
             */
            activate: function (value, concatenation, parent, refresh) {
                Logger.log('Shop.isotope.filter.activate: ', value, concatenation, parent);
                if (typeof Shop.isotope.filter.activated[parent] === 'undefined') {
                    Shop.isotope.filter.activated[parent] = {
                        concatenation: '',
                        items: {}
                    }
                }
                Shop.isotope.filter.activated[parent].concatenation = concatenation;
                Shop.isotope.filter.activated[parent].items[value] = value;
                if (refresh) Shop.isotope.refresh();
            },

            /**
             * Deactivate a filter setting
             * @param value
             * @param parent
             * @param refresh
             */
            deactivate: function (value, parent, refresh) {
                Logger.log('Shop.isotope.filter.deactivate: ', value, parent);
                if (typeof Shop.isotope.filter.activated[parent] !== 'undefined') {
                    delete Shop.isotope.filter.activated[parent].items[value];
                    if (jQuery.isEmptyObject(Shop.isotope.filter.activated[parent].items)) {
                        delete Shop.isotope.filter.activated[parent];
                    }
                }
                if (refresh) Shop.isotope.refresh();
            },

            /**
             * Get current filter settings
             * @returns {string}
             */
            get: function () {
                Logger.log('Shop.isotope.filter.get: ', Shop.isotope.filter);
                Shop.isotope.filter.activatedArray = {};
                Shop.isotope.filter.activatedString = '';
                var first = true;

                var tempArray = [];

                jQuery.each(Shop.isotope.filter.activated, function (key, value) {
                    if (value.concatenation === 'and') {
                        // Concatenate with AND
                        jQuery.each(value.items, function (itemKey) {
                            if (typeof Shop.isotope.filter.activatedArray[key] === 'undefined') {
                                Shop.isotope.filter.activatedArray[key] = '.product-tag-' + itemKey;
                            } else {
                                Shop.isotope.filter.activatedArray[key] = Shop.isotope.filter.activatedArray[key] + '.product-tag-' + itemKey;
                            }
                        })
                    } else {
                        // Concatenate with OR
                        if (first) {
                            jQuery.each(value.items, function (itemKey) {
                                tempArray[tempArray.length] = '.product-tag-' + itemKey;
                            });
                            first = false;
                        } else {
                            var newTempArray = [];
                            jQuery.each(value.items, function (itemKey) {
                                jQuery.each(tempArray, function (tempKey, tempValue) {
                                    newTempArray[newTempArray.length] = tempValue + '.product-tag-' + itemKey;
                                });
                            });
                            tempArray = newTempArray;
                        }
                        Shop.isotope.filter.activatedArray = tempArray;
                    }
                });
                // Map object into array
                Shop.isotope.filter.activatedArray = jQuery.map(Shop.isotope.filter.activatedArray, function (e) {
                    return e;
                });
                // Join array and return
                Shop.isotope.filter.activatedString = Shop.isotope.filter.activatedArray.join(', ');
                Logger.log('Shop.isotope.filter.get: ', Shop.isotope.filter.activatedString);
                // Remind isotope filter in session
                var data = {
                    tx_shop_jsonapi: {
                        action: 'filter',
                        remind: true,
                        isotope: Shop.isotope.filter.activatedString
                    }
                };
                jQuery.ajax({
                    url: jQuery('.tx-shop').attr('data-shop-filter-isotope-json-api'),
                    dataType: 'json',
                    data: data,
                    method: 'POST',
                    success: function (json) {
                        Logger.log(json);
                    },
                    error: function () {
                        //
                    }
                });
                return Shop.isotope.filter.activatedString;
            }

        }
    },

    bookmarks: {

        /**
         * Initializes the bookmarks
         */
        initialize: function () {
            // Bind bookmark buttons
            var bookmarkItems = jQuery('[data-product-bookmark-item-uid]:not(.initialized)');
            if (bookmarkItems.length > 0) {
                jQuery.each(bookmarkItems, function () {
                    jQuery(this).addClass('initialized');
                    jQuery(this).change(Shop.bookmarks.change);
                });
            }
        },

        /**
         * Clears all reminded bookmarks
         * @returns {boolean}
         */
        clear: function () {
            // Clear porducts
            var data = {
                tx_shop_jsonapi: {
                    clear: true
                }
            };
            // Send bookmark action
            jQuery.ajax({
                url: jQuery('.tx-shop').attr('data-shop-bookmark-json-api'),
                dataType: 'json',
                data: data,
                method: 'POST',
                success: function (json) {
                    // Refresh bookmarks count
                    var bookmarkButton = jQuery('.bookmarks-button');
                    var bookmarkButtonCount = jQuery('.bookmarks-item-count');
                    if (bookmarkButtonCount.length > 0) {
                        bookmarkButtonCount.html(json.bookmarks.count);
                        json.bookmarks.count = parseInt(json.bookmarks.count, 10);
                        if (json.bookmarks.count === 0) {
                            bookmarkButton.addClass('disabled');
                            // Unset all bookmark checkboxes
                            jQuery('[data-product-bookmark-item-uid]').prop('checked', false);
                        } else {
                            bookmarkButton.removeClass('disabled');
                        }
                    }
                    if (typeof json.messages.info !== 'undefined') {
                        FlashMessage.push(json.messages.info, 'info', '#shop-flash-messages');
                    }
                },
                error: function () {
                    //
                }
            });
            return false;
        },

        /**
         * On change bookmarks button
         * @returns {boolean}
         */
        change: function () {
            // Default: Forget product
            var data = {
                tx_shop_jsonapi: {
                    remind: false,
                    product: parseInt(jQuery(this).val(), 10)
                }
            };
            // set bookmark
            if (jQuery(this).prop('checked')) {
                data.tx_shop_jsonapi.remind = true;
            }
            // Send bookmark action
            jQuery.ajax({
                url: jQuery('.tx-shop').attr('data-shop-bookmark-json-api'),
                dataType: 'json',
                data: data,
                method: 'POST',
                success: function (json) {
                    // Refresh bookmarks count
                    var bookmarkButton = jQuery('.bookmarks-button');
                    var bookmarkButtonCount = jQuery('.bookmarks-item-count');
                    if (bookmarkButtonCount.length > 0) {
                        bookmarkButtonCount.html(json.bookmarks.count);
                        json.bookmarks.count = parseInt(json.bookmarks.count, 10);
                        if (json.bookmarks.count === 0) {
                            bookmarkButton.addClass('disabled');
                        } else {
                            bookmarkButton.removeClass('disabled');
                        }
                    }
                    // Refresh compare button
                    var compareButton = jQuery('.product-compare-button');
                    if (compareButton.length > 0) {
                        json.bookmarks.count = parseInt(json.bookmarks.count, 10);
                        jQuery('.bookmarks-count', compareButton).html(json.bookmarks.count);
                        if (json.bookmarks.count === 0) {
                            jQuery('.bookmarks-available', compareButton).hide();
                            jQuery('.no-bookmarks-available', compareButton).show();
                        } else if (json.bookmarks.count === 1) {
                            jQuery('.bookmarks-available', compareButton).show();
                            jQuery('.no-bookmarks-available', compareButton).hide();
                            jQuery('.bookmarks-count-single', compareButton).show();
                            jQuery('.bookmarks-count-multiple', compareButton).hide();
                        } else {
                            jQuery('.bookmarks-available', compareButton).show();
                            jQuery('.no-bookmarks-available', compareButton).hide();
                            jQuery('.bookmarks-count-single', compareButton).hide();
                            jQuery('.bookmarks-count-multiple', compareButton).show();
                        }
                    }
                    if (typeof json.messages.info !== 'undefined') {
                        FlashMessage.push(json.messages.info, 'info', '#shop-flash-messages');
                    }
                    // Error, for example in case of max items reached
                    if (typeof json.messages.danger !== 'undefined') {
                        FlashMessage.push(json.messages.danger, 'danger', '#shop-flash-messages');
                        // Reset checkboxes, because when max items are reached, the current checkbox mus be unchecked
                        jQuery('.product-bookmarks input').prop('checked', false);
                        jQuery.each(json.bookmarks.items, function (key) {
                            jQuery('#product-bookmark-button_' + key).prop('checked', true);
                        })
                    }
                },
                error: function () {
                    //
                }
            });
            return false;
        }
    }

};
jQuery(document).ready(function () {
    Shop.initialize();
});
