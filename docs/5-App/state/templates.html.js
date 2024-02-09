export default `<html>
          <body>
            <template id="invoice-template">
  <dl>
    <div>
      <dt>Room Rate</dt>
      <dd id="room-rate">199 USD</dd>
    </div>
    <div>
      <dt>#Rooms</dt>
      <dd id="room-count">1</dd>
    </div>
    <div>
      <dt>#Nights</dt>
      <dd id="night-count">7</dd>
    </div>
    <div>
      <dt>Total</dt>
      <dd id="total-charge">1393 USD</dd>
    </div>
  </dl>
  <style>
    dl {
      display: flex;
      width: max-content;
      gap: 1rem;
    }
    dl > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    dt {
      font-weight: bold;
    }
    dd {
      margin: 0;
    }
  </style>
</template>

          </body>
        </html>`;