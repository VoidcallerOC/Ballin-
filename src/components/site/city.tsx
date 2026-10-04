export function CityNight() {
  return (
    <div className="city-night" aria-hidden="true">
      <div className="city-rain" />
      <svg className="city-skyline" viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice">
        <g className="city-far">
          <rect x="40" y="250" width="70" height="270" />
          <rect x="130" y="190" width="46" height="330" />
          <rect x="190" y="230" width="90" height="290" />
          <rect x="300" y="160" width="54" height="360" />
          <rect x="370" y="210" width="120" height="310" />
          <rect x="520" y="180" width="40" height="340" />
          <rect x="580" y="240" width="100" height="280" />
          <rect x="710" y="140" width="64" height="380" />
          <rect x="790" y="200" width="130" height="320" />
          <rect x="940" y="170" width="48" height="350" />
          <rect x="1004" y="220" width="110" height="300" />
          <rect x="1140" y="150" width="58" height="370" />
          <rect x="1216" y="230" width="90" height="290" />
          <rect x="1320" y="190" width="80" height="330" />
        </g>
        <g className="city-near">
          <path d="M0 360 H180 V250 H230 V190 H268 V250 H340 V210 H410 V300 H520 V160 H560 V230 H640 V280 H760 V200 H820 V140 H868 V220 H980 V250 H1080 V180 H1140 V240 H1260 V200 H1320 V270 H1440 V360 Z" />
          <rect x="230" y="120" width="38" height="70" />
          <rect x="820" y="78" width="48" height="62" />
          <rect x="1080" y="110" width="28" height="70" />
        </g>
        <g className="city-windows">
          <rect x="248" y="210" width="8" height="14" />
          <rect x="248" y="240" width="8" height="14" />
          <rect x="272" y="210" width="8" height="14" />
          <rect x="548" y="190" width="8" height="16" />
          <rect x="548" y="220" width="8" height="16" />
          <rect x="836" y="168" width="10" height="18" />
          <rect x="856" y="168" width="10" height="18" />
          <rect x="836" y="200" width="10" height="18" />
          <rect x="1094" y="210" width="8" height="14" />
          <rect x="1278" y="230" width="8" height="14" />
          <rect x="1296" y="230" width="8" height="14" />
          <rect x="1278" y="258" width="8" height="14" />
        </g>
        <g className="city-neon">
          <rect x="410" y="286" width="70" height="6" />
          <rect x="760" y="248" width="48" height="5" />
          <rect x="1140" y="228" width="62" height="5" />
        </g>
        <g className="city-palms">
          <path d="M1288 430 C1296 368 1276 318 1306 268" />
          <path d="M1306 272 C1272 258 1238 244 1210 256" />
          <path d="M1306 272 C1288 234 1296 194 1324 172" />
          <path d="M1306 272 C1342 246 1380 244 1408 264" />
          <path d="M1306 272 C1330 296 1334 334 1314 356" />
        </g>
      </svg>
      <div className="city-wet" />
    </div>
  );
}
