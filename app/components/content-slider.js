import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['content-slider'],
  currentSlide: 0,

  didInsertElement() {
    this.$mask = this.$('.content-slider__container');
    this.$itemsContainer = this.$('.content-slider__items');
    this.$items = this.$itemsContainer.children();
    this.itemSize = this.$items.eq(0).outerWidth(true);
    this.slideTotal = Math.ceil(this.$items.length / (this.$mask.width() / this.itemSize));
  },

  actions: {
    next() {
      const currentSlide = this.get("currentSlide");
      if (currentSlide === this.slideTotal - 1) {
        this.set("currentSlide", 0);
      } else {
        this.set("currentSlide",  currentSlide + 1);
      }
      this.moveSlide();
    },

    prev() {
      const currentSlide = this.get("currentSlide");
      if (currentSlide === 0) {
        this.set("currentSlide", this.slideTotal - 1);
      } else {
        this.set("currentSlide", currentSlide - 1);
      }
      this.moveSlide();
    }
  },

  moveSlide() {
    const percentToMove = this.currentSlide * 100;
    this.$itemsContainer.css('transform', `translateX(${-Math.abs(percentToMove)}%)`);
  }
});
