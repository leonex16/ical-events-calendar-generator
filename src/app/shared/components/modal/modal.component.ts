import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'x-modal',
  standalone: true,
  imports: [],
  template: `
    <div id="staticModal" tabindex="-1" aria-hidden="true"
        class="fixed inset-0 z-50 h-full overscroll-contain backdrop-blur-sm backdrop-brightness-50">
        <div class="relative top-1/2 left-1/2 max-w-none sm:max-w-xl w-full -translate-x-1/2 -translate-y-1/3 sm:-translate-y-1/2 p-4">
            <!-- Modal content -->
            <div class="relative m-auto bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        <ng-content select="[header]"/>
                    </h3>
                    <button 
                      (click)="onCloseHandler()"
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="staticModal">
                        <span class="material-symbols-outlined">
                          close
                        </span>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 space-y-6">
                  <ng-content select="[body]"/>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <ng-content select="[footer]"/>
                </div>
            </div>
        </div>
    </div>
  `
})

export class ModalComponent {
  @Output() onClose = new EventEmitter<boolean>()

  onCloseHandler() {
    this.onClose.emit(true);
  }
}