export default `<html>
            <body><div data-scene="1"><main>
  <h3>Guest Info</h3>
  <travelers-form id="travelers">
    <label>
      Number of guests
      <input type="number" />
    </label>
  </travelers-form>
  <hr />
  <h3>Travel Dates</h3>
  <schedule-form id="schedule">
    <label>
      Check-in on
      <input type="date" name="first-date" />
    </label>
    <label>
      Check-out on
      <input type="date" name="last-date" />
    </label>
  </schedule-form>
  <hr />
  <h3>Invoice</h3>
  <invoice-observer travelers="#travelers" schedule="#schedule">
  </invoice-observer>
</main>
</div>
<div data-scene="2"><travelers-form>
  <label> Number of guests <input type="number" /> </label>
</travelers-form>
</div>
<div data-scene="3"><schedule-form>
  <label>
    Check-in on
    <input type="date" name="first-date" />
  </label>
  <label>
    Check-out on
    <input type="date" name="last-date" />
  </label>
</schedule-form>
</div>
<div data-scene="4"><main>
  <travelers-form id="travelers"> </travelers-form>
  <schedule-form id="schedule"> </schedule-form>
  <invoice-observer travelers="#travelers" schedule="#schedule">
  </invoice-observer>
</main>
</div></body>
            </html>`;