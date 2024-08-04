// 'use client';

type SelectPhoneIndexType = {
  contactDetailsSubmitted: boolean;
  // children: ReactNode;
}

export default function SelectPhoneIndex({ contactDetailsSubmitted }: SelectPhoneIndexType) {
  return (
    <>
      <label htmlFor={`phone-number-start`}></label>
      <select name={`countryCode`}
              className={`${contactDetailsSubmitted ? `book-now__details__input-select-tel` : ``}`}
              id={`phone-number-start`} required>
        <option value="1">(+1) USA</option>
        <option value="38">(+38) Ukraine</option>
        <option value="44">(+44) UK</option>
        <option value="33">(+33) France</option>
        <option value="49">(+49) Germany</option>
        <option value="34">(+34) Spain</option>
        <option value="39">(+39) Italy</option>
        <option value="7">(+7) Russia</option>
        <option value="81">(+81) Japan</option>
        <option value="86">(+86) China</option>
        <option value="82">(+82) South Korea</option>
        <option value="91">(+91) India</option>
        <option value="54">(+54) Argentina</option>
        <option value="55">(+55) Brazil</option>
        <option value="1">(+1) Canada</option>
        <option value="61">(+61) Australia</option>
        <option value="64">(+64) New Zealand</option>
        <option value="27">(+27) South Africa</option>
        <option value="41">(+41) Switzerland</option>
        <option value="46">(+46) Sweden</option>
        <option value="31">(+31) Netherlands</option>
        <option value="32">(+32) Belgium</option>
        <option value="48">(+48) Poland</option>
        <option value="420">(+420) Czech Republic</option>
        <option value="36">(+36) Hungary</option>
        <option value="43">(+43) Austria</option>
        <option value="30">(+30) Greece</option>
        <option value="90">(+90) Turkey</option>
        <option value="351">(+351) Portugal</option>
        <option value="40">(+40) Romania</option>
        <option value="45">(+45) Denmark</option>
        <option value="47">(+47) Norway</option>
        <option value="358">(+358) Finland</option>
        <option value="353">(+353) Ireland</option>
        <option value="352">(+352) Luxembourg</option>
        <option value="370">(+370) Lithuania</option>
        <option value="371">(+371) Latvia</option>
        <option value="372">(+372) Estonia</option>
        <option value="385">(+385) Croatia</option>
        <option value="386">(+386) Slovenia</option>
        <option value="387">(+387) Bosnia and Herzegovina</option>
        <option value="389">(+389) North Macedonia</option>
        <option value="381">(+381) Serbia</option>
        <option value="84">(+84) Vietnam</option>
        <option value="60">(+60) Malaysia</option>
        <option value="62">(+62) Indonesia</option>
        <option value="63">(+63) Philippines</option>
        <option value="66">(+66) Thailand</option>
        <option value="65">(+65) Singapore</option>
        <option value="92">(+92) Pakistan</option>
        <option value="880">(+880) Bangladesh</option>
        <option value="94">(+94) Sri Lanka</option>
        <option value="960">(+960) Maldives</option>
        <option value="971">(+971) United Arab Emirates</option>
        <option value="966">(+966) Saudi Arabia</option>
        <option value="968">(+968) Oman</option>
        <option value="974">(+974) Qatar</option>
        <option value="973">(+973) Bahrain</option>
        <option value="965">(+965) Kuwait</option>
        <option value="962">(+962) Jordan</option>
        <option value="961">(+961) Lebanon</option>
        <option value="20">(+20) Egypt</option>
        <option value="212">(+212) Morocco</option>
        <option value="216">(+216) Tunisia</option>
        <option value="213">(+213) Algeria</option>
        <option value="218">(+218) Libya</option>
        <option value="249">(+249) Sudan</option>
        <option value="254">(+254) Kenya</option>
        <option value="233">(+233) Ghana</option>
        <option value="234">(+234) Nigeria</option>
        <option value="263">(+263) Zimbabwe</option>
        <option value="27">(+27) South Africa</option>
        <option value="52">(+52) Mexico</option>
        <option value="57">(+57) Colombia</option>
        <option value="56">(+56) Chile</option>
        <option value="51">(+51) Peru</option>
        <option value="58">(+58) Venezuela</option>
        <option value="593">(+593) Ecuador</option>
        <option value="595">(+595) Paraguay</option>
        <option value="598">(+598) Uruguay</option>
        <option value="591">(+591) Bolivia</option>
        <option value="506">(+506) Costa Rica</option>
        <option value="507">(+507) Panama</option>
        <option value="502">(+502) Guatemala</option>
        <option value="503">(+503) El Salvador</option>
        <option value="504">(+504) Honduras</option>
        <option value="505">(+505) Nicaragua</option>
      </select>
    </>
  );
}
