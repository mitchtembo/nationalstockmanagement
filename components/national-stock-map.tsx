"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

interface NationalStockMapProps {
  interactive?: boolean
}

// Helper function to get Tailwind *fill* colors
const getStatusFillColor = (status: string) => {
  switch (status) {
    case "critical":
      return "fill-red-500"
    case "warning":
      return "fill-amber-500"
    case "normal":
      return "fill-green-500"
    case "excess":
      return "fill-blue-500"
    default:
      return "fill-gray-300"
  }
}

// Helper function to get Tailwind *background* colors (for legend, district dots)
const getStatusBgColor = (status: string) => {
   switch (status) {
    case "critical":
      return "bg-red-500"
    case "warning":
      return "bg-amber-500"
    case "normal":
      return "bg-green-500"
    case "excess":
      return "bg-blue-500"
    default:
      return "bg-gray-300"
  }
}

export function NationalStockMap({ interactive = false }: NationalStockMapProps) {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null)
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(null)

  // Province data - IDs match SVG path IDs
  const provinces = [
    {
      id: "ZW-BU", // Bulawayo
      name: "Bulawayo",
      status: "normal",
      districts: [
        { id: "bulawayo_central", name: "Bulawayo Central", status: "normal" },
        { id: "bulawayo_east", name: "Bulawayo East", status: "normal" },
      ],
    },
    {
      id: "ZW-HA", // Harare
      name: "Harare",
      status: "normal",
      districts: [
        { id: "harare_central", name: "Harare Central", status: "normal" },
        { id: "chitungwiza", name: "Chitungwiza", status: "warning" },
      ],
    },
    {
      id: "ZW-MA", // Manicaland
      name: "Manicaland",
      status: "critical",
      districts: [
        { id: "mutare", name: "Mutare", status: "critical" },
        { id: "chipinge", name: "Chipinge", status: "warning" },
      ],
    },
    {
      id: "ZW-MC", // Mashonaland Central
      name: "Mashonaland Central",
      status: "normal",
      districts: [
        { id: "bindura", name: "Bindura", status: "normal" },
        { id: "shamva", name: "Shamva", status: "normal" },
      ],
    },
    {
      id: "ZW-ME", // Mashonaland East
      name: "Mashonaland East",
      status: "warning",
      districts: [
        { id: "marondera", name: "Marondera", status: "warning" },
        { id: "mutoko", name: "Mutoko", status: "normal" },
      ],
    },
    {
      id: "ZW-MW", // Mashonaland West
      name: "Mashonaland West",
      status: "normal",
      districts: [
        { id: "chinhoyi", name: "Chinhoyi", status: "normal" },
        { id: "kariba", name: "Kariba", status: "normal" },
      ],
    },
    {
      id: "ZW-MV", // Masvingo
      name: "Masvingo",
      status: "warning",
      districts: [
        { id: "masvingo_city", name: "Masvingo City", status: "warning" },
        { id: "chiredzi", name: "Chiredzi", status: "critical" },
      ],
    },
    {
      id: "ZW-MN", // Matabeleland North
      name: "Matabeleland North",
      status: "critical",
      districts: [
        { id: "hwange", name: "Hwange", status: "critical" },
        { id: "binga", name: "Binga", status: "warning" },
      ],
    },
    {
      id: "ZW-MS", // Matabeleland South
      name: "Matabeleland South",
      status: "normal",
      districts: [
        { id: "gwanda", name: "Gwanda", status: "normal" },
        { id: "beitbridge", name: "Beitbridge", status: "warning" },
      ],
    },
    {
      id: "ZW-MI", // Midlands
      name: "Midlands",
      status: "warning",
      districts: [
        { id: "gweru", name: "Gweru", status: "warning" },
        { id: "kwekwe", name: "Kwekwe", status: "normal" },
      ],
    },
  ]

  const selectedProvinceData = provinces.find(p => p.id === selectedProvinceId);
  const hoveredProvinceData = provinces.find(p => p.id === hoveredProvinceId);

  // Inline SVG Component using the provided data
  const ZimbabweSvgComponent = () => (
     <svg
       viewBox="0 0 654.63501 600"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>Map of Zimbabwe Provinces</title>
      <g>
        {/* Example Province Paths - To be replaced with actual path data */}
        <path
          id="ZW-BU"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-BU')?.status || 'default')}`}
          d="M 200 400 L 210 400 L 210 410 L 200 410 Z"
          onMouseEnter={() => setHoveredProvinceId('ZW-BU')}
          onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-BU' ? null : 'ZW-BU')}
        />
        <path
          id="ZW-HA"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-HA')?.status || 'default')}`}
          d="M 450 250 L 460 250 L 460 260 L 450 260 Z"
          onMouseEnter={() => setHoveredProvinceId('ZW-HA')}
          onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-HA' ? null : 'ZW-HA')}
        />
        <path
          id="ZW-MA"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-MA')?.status || 'default')}`}
          d="M 600 300 L 650 310 L 640 350 L 590 340 Z"
          onMouseEnter={() => setHoveredProvinceId('ZW-MA')}
           onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-MA' ? null : 'ZW-MA')}
         />
         <path
          id="ZW-MC"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-MC')?.status || 'default')}`}
          d="M 400 150 L 450 150 L 440 200 L 390 200 Z"
          onMouseEnter={() => setHoveredProvinceId('ZW-MC')}
            onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-MC' ? null : 'ZW-MC')}
          />
          <path
          id="ZW-ME"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-ME')?.status || 'default')}`}
          d="m 638.927,95.263 1.469,0.948 0.598,0.063 2.505,-1.635 0.358,0.221 3.664,0.065 0.604,0.223 -0.993,5.675 -4.561,10.58 -1.443,0.788 -4.203,1.087 -0.762,0.433 0.233,0.98 0.929,1.404 7.412,10.489 4.055,9.627 0.602,5.718 0,0 -4.234,1.543 -3.361,0.45 -2.606,0.638 -1.563,1.42 -1.467,2.498 -1.846,1.065 -1.896,0.427 -1.843,1.345 -1.047,1.533 -0.137,1.359 -0.882,1.97 -0.623,0.768 -0.378,1.124 -0.246,2.041 -0.502,0.927 -0.704,0.689 -0.828,0.371 -2.847,0.601 -2.363,1.272 -0.307,0.644 -0.026,0.999 0.345,1.795 -0.064,0.961 -0.382,1.004 -2.577,0.236 -2.342,2.752 -0.189,0.602 -1.151,0.136 -1.694,0.903 -2.585,-0.245 -1.228,0.256 -1.987,2.707 -2.477,1.834 -5.35,1.029 -3.15,2.202 -1.173,1.336 -2.136,0.827 -1.018,1.174 -1.023,0.733 -0.931,1.773 -2.04,2.108 -1.027,0.452 -1.297,1.218 -0.834,0.13 -3.828,2.369 -0.862,1.052 -0.217,1.645 -0.745,0.81 0.684,3.679 -3.893,3.774 -2.903,3.522 -1.814,1.384 -1.453,1.661 -2.968,1.638 -1.095,1.697 0.09,0.882 1.923,4.032 0.009,0.721 -2.271,0.106 -2.475,-0.374 -1.832,0.18 -0.879,-0.231 -0.605,-0.555 -0.8,-0.273 -1.751,0.34 -0.826,0.892 -0.697,1.733 -0.181,1.647 0.25,7.749 0.392,2.808 -0.151,4.14 -0.192,0.686 -1.258,1.62 -0.188,0.967 0.134,1.245 0.58,1.803 -1.03,0.694 -2.191,0.465 -3.341,1.121 -0.67,0.81 -0.885,2.986 -0.791,0.772 -1.352,0.496 -0.395,0.487 2.023,2.152 0.899,1.841 0.85,0.918 0.006,0.482 -0.742,1.497 -0.169,2.699 2.593,3.073 0.776,1.401 2.223,1.99 0.784,2.004 -0.298,1.856 1.128,0.593 1.919,0.019 1.849,0.744 1.018,1.359 0.984,1.963 0.215,1.206 -0.344,4.558 0.712,2.491 0.612,0.96 1.651,0.707 0.285,0.399 1.247,3.534 1.139,1.438 0.21,0.724 0.133,1.047 -0.368,2.465 0.076,2.703 -0.689,2.59 0.178,1.289 1.037,2.732 -3.175,-0.689 -0.759,0.212 -1.113,0.779 -0.882,0.011 -3.584,-1.291 -3.633,-2.018 -3.205,-3.234 -3.428,-1.901 -1.567,-0.347 -1.516,0.622 -0.672,0.773 -3.4,0.641 -1.729,-0.508 -2.829,-2.151 -0.963,-0.111 -0.555,0.57 0.141,1.854 0.416,1.409 -0.232,0.931 -3.181,6.086 -1.425,1.751 -0.48,0.246 -0.923,-0.153 -1.615,-0.954 -1.927,-0.305 -0.807,-0.356 -0.526,-0.561 -0.458,-1.571 -0.569,-0.722 -1.566,-0.268 -1.601,0.377 -1.083,-0.031 -1.939,-1.517 -3.17,-0.256 -0.801,0.127 -0.395,0.569 -0.081,4.402 -0.511,1.055 -0.797,0.531 -0.673,1.016 -0.324,4.043 -0.438,0.407 -0.64,0.168 -2.809,0.022 -2.925,0.547 0,0 -2.769,0.022 -4.009,0.555 -2.971,0.061 -8.099,1.227 -0.566,-0.562 -0.126,-0.646 0.228,-7.195 -2.408,-0.147 -4.543,-1.346 -0.512,1.538 0.058,2.586 -0.479,0.245 -0.804,-0.157 -0.078,0.445 1.152,3.995 -0.159,0.244 -2.123,0.82 -0.878,0.651 -0.356,0.69 0,0 -1.012,-1.166 -3.466,-2.003 -2.742,-1.966 -0.848,-0.926 -1.42,-2.417 -0.765,-0.319 -1.203,0.006 -0.686,-0.523 -0.128,-1.333 0.269,-2.223 1.243,-0.005 -0.211,-1.575 -0.65,-1.452 -2.586,-3.379 -1.702,-3.304 0.236,-0.808 2.148,-2.876 -1.448,-1.002 -0.06,-3.591 -0.482,-0.16 -2.122,0.292 -1.801,0.533 -1.482,0.127 -0.959,0.447 -0.522,-0.038 -2.251,-1.404 -5.783,-2.762 0,0 1.791,-2.67 0.559,-0.405 2.084,0.315 0.427,-2.865 1.275,-1.295 2.315,-1.581 0.433,-1.574 -0.352,-6.448 0.52,0.118 0.925,0.964 0.441,0.159 0.361,-0.122 0.754,-0.929 0.201,0.08 0.848,1.487 2.893,-5.25 1.115,-0.933 0.674,-1.13 0.273,-1.25 2.109,-1.983 1.666,-2.463 0.43,-1.493 -0.146,-4.628 0.663,-2.821 0.015,-4.465 0.196,-0.524 1.63,-1.336 0.154,-0.965 -1.41,-2.286 -2.21,-2.201 -3.016,-3.847 -0.895,-3.252 0.108,-2.09 0.237,-0.604 3.339,-2.345 1.229,-1.332 0.193,-1.165 -0.646,-1.605 0.781,-2.733 0.749,-1.65 1.509,-1.091 0.356,-0.524 0.077,-0.683 -1.421,-4.449 -0.045,-0.844 2.576,-2.54 0.275,-0.723 -0.255,-2.607 0.709,-1.407 0.875,-0.366 2.629,-0.012 2.116,0.712 1.6,1.115 0,0 1.321,1.076 6.72,3.775 2.605,2.072 2.571,2.714 1.153,-0.249 1.031,-0.808 1.793,-0.092 2.381,-1.86 -1.493,-0.936 -0.382,-1.276 0.076,-0.386 2.533,-0.016 0.578,-2.572 -0.423,-3.286 2.059,-1.617 1.198,0.353 0.754,-0.246 0.391,-0.805 0.181,-2.367 1.467,-0.811 0.272,-0.844 -1.258,-2.958 -0.248,-1.321 0.145,-1.764 -0.843,-0.996 -0.164,-0.641 0.692,-3.049 -0.456,-2.281 -1.235,-0.352 -1.946,0.373 -0.916,-0.074 -0.679,-0.357 -0.794,0.125 -0.758,-0.235 -0.495,-2.4 -2.268,-0.227 0,0 0.668,-1.085 0.531,-3.488 0.627,-1.405 0.298,-2.804 -0.201,-0.159 -1.03,0.487 -0.556,0.003 -0.559,-0.396 -0.444,-1.039 -0.008,-1.161 1.987,0.069 0.95,-0.487 -0.206,-1.039 0.147,-1.681 1.175,-2.568 1.334,-1.34 1.239,0.124 3.981,1.254 6.122,0.28 2.747,0.82 -0.537,2.365 -1.444,3.092 -0.577,2.405 -0.784,1.366 -0.032,1.122 0.66,2.917 1.789,-0.212 1.854,-1.614 0.674,-0.286 0.834,-0.166 2.31,0.583 1.308,-0.57 5.053,-4.041 0.595,-0.125 0.951,1.934 0.528,-0.905 0.502,-1.684 1.538,-1.334 1.06,-3.119 1.867,-2.505 1.74,-0.895 3.132,-0.626 1.718,-1.076 0.791,-2.265 0.745,-1.045 0.83,-0.367 0.186,-1.162 1.373,-1.69 2.446,-1.701 4.797,-4.358 0.581,-1.365 -0.155,-3.474 -0.251,-1.236 -1.447,-1.944 0.232,-0.561 0.471,-0.523 1.545,-0.134 2.287,-1.299 4.5,-1.879 0.713,-0.006 0.59,-0.485 -0.087,-0.718 -0.721,-0.632 -0.287,-0.955 0.344,-1.201 1.63,-3.288 3.886,-3.349 0.229,-0.8 -0.806,-1.388 0.112,-0.52 1.017,-1.166 1.375,-0.931 0.862,-0.966 1.62,-3.844 2.139,0.058 1.183,-0.49 0.86,-0.925 0.228,-0.841 -0.802,-4.415 0.388,-0.762 1.971,-0.697 1.592,-2.527 1.542,-0.135 1.31,0.384 0.87,-0.088 1.411,-1.091 1.462,-0.175 3.735,-1.873 1.656,-0.536 1.426,0.223 1.712,0.898 0.593,-0.047 2.312,-1.778 1.965,-0.978 3.833,-0.165 4.795,-2.285 5.121,-1.377 3.083,0.042 2.891,0.362 3.985,2.258 1.865,0.573 4.526,-1.413 1.348,0.26 2.149,1.006 1.18,-0.413 4.216,-2.679 0,0 1.26,0.527 0.939,-0.212 1.916,0.075 0.42,-0.216 1.394,0.329 0.604,-0.753 0.839,-0.133 0.892,0.784 z"
          onMouseEnter={() => setHoveredProvinceId('ZW-ME')}
            onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-ME' ? null : 'ZW-ME')}
          />
           <path
          id="ZW-MW"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-MW')?.status || 'default')}`}
          d="M 300 180 L 350 190 L 340 240 L 290 230 Z"
          onMouseEnter={() => setHoveredProvinceId('ZW-MW')}
            onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-MW' ? null : 'ZW-MW')}
          />
           <path
          id="ZW-MV"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-MV')?.status || 'default')}`}
          d="M 450 420 L 500 430 L 490 480 L 440 470 Z"
          onMouseEnter={() => setHoveredProvinceId('ZW-MV')}
            onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-MV' ? null : 'ZW-MV')}
          />
           <path
          id="ZW-MN"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-MN')?.status || 'default')}`}
          d="M 150 250 L 250 260 L 240 350 L 140 340 Z"
          onMouseEnter={() => setHoveredProvinceId('ZW-MN')}
            onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-MN' ? null : 'ZW-MN')}
          />
           <path
          id="ZW-MS"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-MS')?.status || 'default')}`}
          d="M 250 480 L 350 490 L 340 540 L 240 530 Z"
          onMouseEnter={() => setHoveredProvinceId('ZW-MS')}
            onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-MS' ? null : 'ZW-MS')}
          />
           <path
          id="ZW-MI"
          className={`cursor-pointer stroke-white stroke-1 hover:opacity-80 ${getStatusFillColor(provinces.find(p => p.id === 'ZW-MI')?.status || 'default')}`}
          d="m 252.632,155.293 2.745,-0.416 1.942,0.737 0.635,-0.033 1.714,-0.666 1.081,-1.032 1.827,0.055 2.467,-0.379 4.935,-1.201 0.634,0.286 0.867,0.926 3.287,1.786 1.146,1.01 0.637,-0.076 1.493,-3.67 1.596,-1.069 2.763,-3.78 1.672,-0.507 0.443,-0.918 0.331,-2.357 2.647,-4.62 0.64,-0.755 2.66,-0.102 3.512,-3.375 1.668,-0.429 1.831,-1.028 1.867,-0.228 5.397,0.031 0.914,-0.194 1.434,-1.191 0.596,-0.197 1.152,-0.113 0.552,0.682 1.34,2.365 1.02,2.884 1.461,1.646 1.942,0.889 0.951,0.725 2.102,0.53 0.753,0.524 1.308,0.446 0.631,1.402 0.435,0.282 2.501,0.331 2.538,1.131 1.032,0.084 0.951,0.765 1.349,0.326 1.747,0.206 2.94,-0.228 0.595,0.283 0.235,1.36 1.349,0.526 0.436,0.681 0.308,3.842 0.316,0.442 2.381,1.208 1.23,0.965 1.109,1.724 0.834,0.443 1.386,1.966 1.708,0.846 1.629,0.246 0.516,0.561 -1.038,2.479 -1.832,1.436 -2.235,3.597 -1.674,1.277 -0.159,0.399 -0.002,0.922 1.429,1.406 0.395,1.044 -0.361,1.441 0.354,1.804 -0.52,1.24 0.035,2.285 -2.617,2.612 -0.1,1.548 1.59,1.248 0.078,0.682 -2.436,2.839 -0.28,0.6 -0.084,1.885 -0.92,1.561 -1.038,0.759 -0.205,2.486 -2.12,2.882 -1.724,3.445 0.038,1.044 -0.401,0.601 0.075,1.565 -0.801,1.482 -0.003,0.843 0.635,1.248 0.115,1.245 1.147,3.7 1.353,1.491 0.673,2.052 1.668,2.739 0.715,1.89 0.437,0.444 2.034,0.891 1.035,0.969 2.115,0.65 1.551,3.14 1.036,1.089 2.155,0.288 1.238,0.486 2.154,1.614 2.594,1.094 2.992,2.419 2.716,0.851 1.277,1.249 0.719,0.324 0.759,0.967 -0.723,3.62 -0.081,1.69 -1.32,1.446 -0.161,0.644 0.396,4.268 -0.963,2.696 0,0.684 0.678,2.419 1.199,0.767 1.12,0.003 1.681,-0.401 0.52,0.244 1.998,2.662 1.28,0.606 0.681,0.081 1.199,-0.361 1.521,0.163 3.401,-0.157 0.52,0.444 1.321,2.379 1,-0.121 1.041,-0.805 0.519,-0.08 0.281,0.766 1.36,0.767 1.482,2.136 1.242,0.485 1.56,-0.323 0.961,1.049 1.081,0.242 1.203,0.806 2.481,0.283 1.36,-0.767 2.161,-0.241 4.004,0.4 1.042,0.967 0.641,0.202 2.08,-0.768 0.761,0.524 0.601,-10e-4 0.723,0.967 0.68,0.16 4.763,-0.207 1.644,0.845 2.242,0.278 1.684,0.723 1.01,3.063 0.321,0.241 2.123,0.399 0.883,0.603 1.085,1.208 1.042,0.037 1.159,-0.445 1.281,-0.164 1.688,1.689 1.244,0.562 1.447,1.649 4.936,2.044 1.447,1.125 1.445,0.763 3.327,0.473 0,0 5.783,2.762 2.251,1.404 0.522,0.038 0.959,-0.447 1.482,-0.127 1.801,-0.533 2.122,-0.292 0.482,0.16 0.06,3.591 1.448,1.002 -2.148,2.876 -0.236,0.808 1.702,3.304 2.586,3.379 0.65,1.452 0.211,1.575 -1.243,0.005 -0.269,2.223 0.128,1.333 0.686,0.523 1.203,-0.006 0.765,0.319 1.42,2.417 0.848,0.926 2.742,1.966 3.466,2.003 1.012,1.166 0,0 -2.759,1.876 -2.433,2.6 -1.399,1.1 -4.481,2.814 -2.877,2.766 0.725,0.36 3.821,0.386 0.685,0.321 0.811,1.209 -0.156,0.81 -0.718,0.692 -2.249,0.335 -1.004,0.288 -0.118,0.285 0.34,3.277 -0.069,1.742 -0.663,3.486 -1.229,3.125 -0.074,1.013 0.126,0.972 0.819,2.183 0.137,2.795 -0.66,4.058 -0.069,1.784 -1.687,7.552 0.007,1.096 0.817,1.984 -0.072,1.34 -1.69,0.414 -3.95,-0.186 -4.194,-1.161 -3.554,-0.509 -0.969,-0.443 -3.425,0.176 -1.489,0.451 -0.631,3.047 0.49,1.257 0.69,0.808 0,0.408 -0.156,0.932 -0.44,0.734 -2.172,1.184 -0.24,0.407 -0.193,1.95 1.257,1.418 -0.562,0.611 -0.403,0.204 -6.573,0.388 -1.574,-0.321 -4.518,0.297 -2.819,1.428 -2.821,0.941 -2.017,0.166 -2.665,-0.319 -0.765,0.326 0.082,0.57 1.78,1.378 0.809,0.933 0.409,1.381 -0.195,2.236 -1.324,2.808 -0.029,3.7 -0.601,1.425 -0.117,1.424 2.699,-2.284 1.333,-0.043 2.633,2.068 2.022,0.849 1.582,1.787 -0.438,1.547 -1.044,1.793 -1.683,4.074 -0.076,1.425 0.448,0.812 0.567,0.366 4.94,1.859 0.447,0.569 0.7,2.727 0.692,1.219 0.567,0.161 1.293,-0.248 1.832,2.52 2.358,2.599 1.35,3.01 2.157,2.438 0.449,0.854 -0.312,2.488 0.259,3.302 0.66,2.404 1.066,2.361 0.895,0.895 2.193,0.724 0.57,0.61 -0.156,1.021 -1.861,0.824 -0.4,0.818 -0.391,2.858 -1.954,6.336 0.012,2.328 -0.674,3.148 0.033,6.498 -3.832,5.043 -1.739,1.478 -2.065,1.274 -1.26,-0.036 -2.034,-0.933 -3.373,-0.358 -0.771,0.042 -2.677,0.95 -2.115,-0.527 -1.744,0.291 -1.099,-0.488 -0.975,0.001 -0.976,-0.324 -1.262,-1.347 -2.114,-0.241 -1.504,-0.488 -1.058,-0.775 -1.956,-2.777 -3.048,-1.385 -0.448,-0.694 -0.814,-0.654 -0.609,-0.122 -0.896,-1.061 -0.813,-0.531 -1.542,-0.039 -2.069,0.534 -1.906,1.227 -6.325,5.399 -2.555,2.863 -0.933,0.572 -1.26,0.286 -2.518,-0.082 -1.666,-0.941 0,0 -1.95,-0.165 -5.524,0.241 -4.103,1.182 -5.808,-0.214 -4.428,-1.031 -0.527,-0.492 -0.04,-0.49 1.179,-1.389 3.291,-2.202 0.975,-1.224 2.477,-1.468 4.183,-3.019 1.461,-1.469 0.609,-2.248 1.216,-9.024 2.391,-7.836 0.526,-2.57 -0.284,-0.245 -0.892,0.163 -2.674,1.057 -1.58,0.203 -0.891,-0.206 -1.053,-0.858 -0.972,-2.123 0.082,-2.202 0.324,-0.53 2.43,-0.649 0.406,-0.612 -0.973,-1.55 2.956,-1.913 0.567,-0.122 1.337,-1.222 1.821,-0.773 0.567,-0.447 0.89,-1.59 0.565,-2.118 1.011,-1.916 0.444,-4.358 0.726,-3.055 1.211,-3.786 1.453,-3.216 0.765,-3.621 0.524,-1.179 -0.083,-2.443 2.863,-6.343 3.989,-6.79 0.159,-2.438 -0.244,-1.179 -0.243,-0.568 -0.808,-0.446 -4.801,-0.122 -0.486,-1.22 0.24,-3.209 -0.928,-0.488 -2.178,0.487 -4.437,1.702 -1.331,-0.123 -1.292,-5.89 -2.218,0.566 -2.904,1.783 -1.088,0.283 -0.646,-0.123 -0.725,-0.65 -2.338,-3.537 -5.883,-3.219 -1.29,-0.166 -0.968,0.242 -2.342,2.755 -1.129,-0.206 -0.644,-0.692 -0.319,-1.503 0.487,-3.206 -0.24,-0.852 0.126,-2.678 1.091,-2.675 0.002,-1.136 -0.321,-1.015 -0.804,-0.976 -3.54,-2.604 -1.402,-3.735 -0.522,-0.691 -3.175,-2.644 -1.805,-2.924 -1.399,-4.057 -1.12,-2.312 -1.245,-1.382 -0.682,-0.367 -0.925,0.036 0,0 -1.364,-1.382 -1.285,-0.491 -0.84,-1.865 -1.805,-1.345 -1.762,-2.274 -3.212,-1.39 -1.041,-1.017 1.657,-2.622 1.21,-1.452 -0.478,-1.176 -0.96,-1.299 -1.922,-1.91 -1.399,-1.907 -3.841,-4.064 -1.762,-1.018 -0.476,-1.66 0.015,-3.679 0.422,-5.13 -0.239,-0.687 -0.879,-0.651 -0.515,-1.821 -0.681,-0.125 0.127,-1.614 -2.045,-0.011 -0.561,-0.125 -0.52,-0.487 -0.632,-2.103 -0.546,-3.355 -2.291,-7.924 -0.271,-1.857 -0.989,-2.588 -0.54,-4.561 -0.992,-2.022 0.325,-1.045 0.643,-0.4 5.051,-1.262 6.214,-2.386 1.442,-0.114 7.494,-2.866 0.963,-0.761 0.202,-0.765 -0.907,-3.671 -0.478,-0.848 -0.279,-0.202 -1.6,-0.007 -3.682,0.385 -4.48,0.098 -2.2,-0.333 -5.481,0.211 -5.319,-0.514 -3.599,0.059 -4.599,-0.553 -3.712,-1.193 -0.721,-0.004 -6.005,0.843 -4.877,-0.519 -2.561,0.182 -3.566,0.898 -7.156,-0.542 -3.606,0.775 -2.52,0.018 -3.436,-0.554 -3.802,0.287 -0.64,-0.126 -1.153,-0.737 -0.763,0.315 -0.799,-0.006 -0.794,-0.734 -2.24,0.059 -1.277,-0.415 -1.16,-0.052 -1.992,-0.785 -1.681,0.185 -2.328,0.822 -2.359,-0.024 -2.793,-0.715 0.335,-5.835 -0.594,-13.244 0.032,-7.519 0.249,-1.043 2.177,-2.308 1.362,-0.549 1.039,0.011 2.11,0.584 1.118,-0.069 0.882,-0.513 0.126,-0.643 -0.194,-0.765 -0.516,-0.246 -2.553,-0.146 -1.347,-1.019 -0.229,-1.168 0.932,-1.476 0.457,-2.085 -0.324,-3.82 -0.274,-0.604 -0.476,-0.246 -2.516,0.375 -1.125,-3.505 -1.066,-1.055 0.002,-0.281 1.057,-2.116 2.771,-2.22 0.41,-1.24 1.122,-0.71 0.243,-0.439 -0.129,-3.372 1.579,-2.753 0.251,-1.361 -1.399,-3.904 0.25,-1.241 2.419,-3.424 0.882,-0.633 2.667,-0.014 0.92,-0.512 2.175,-3.066 1.093,-2.113 0.319,-4.886 1.215,-2.752 0.096,-2.003 -0.339,-2.205 0.088,-1.04 1.493,-2.83 0.659,-2.876 0.933,-2.393 0.256,-2.119 z"
          onMouseEnter={() => setHoveredProvinceId('ZW-MI')}
            onMouseLeave={() => setHoveredProvinceId(null)}
          onClick={() => interactive && setSelectedProvinceId(selectedProvinceId === 'ZW-MI' ? null : 'ZW-MI')}
          />
      </g>
    </svg>
  );

  return (
    <div className="relative w-full h-full bg-slate-50 rounded-lg overflow-hidden border border-gray-200">
      <TooltipProvider>
        {/* Render the SVG Map */}
        <div className="w-full h-full">
           <ZimbabweSvgComponent />
        </div>

        {/* Tooltip for Hovered Province */}
         {hoveredProvinceId && (
           <Tooltip open={true}>
            <TooltipContent side="top" className="absolute pointer-events-none">
               <div className="text-sm font-medium">{provinces.find(p => p.id === hoveredProvinceId)?.name}</div>
               <div className="text-xs">Status: {provinces.find(p => p.id === hoveredProvinceId)?.status}</div>
                </TooltipContent>
              </Tooltip>
         )}

        {/* Show districts when province is selected */}
        {interactive && selectedProvinceData && (
          <Card className="absolute z-10 w-64 top-10 left-10 shadow-lg">
                  <CardHeader className="py-2">
              <CardTitle className="text-sm">{selectedProvinceData.name} Districts</CardTitle>
                    <CardDescription className="text-xs">Stock status by district</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <ul className="space-y-1">
                {selectedProvinceData.districts.map((district) => (
                        <li key={district.id} className="text-xs flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${getStatusBgColor(district.status)}`}></span>
                          {district.name}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-md border border-gray-200 shadow-sm">
          <div className="text-xs font-medium mb-1">Stock Status</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${getStatusBgColor('critical')}`}></div>
              <span className="text-xs">Critical (0-25%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${getStatusBgColor('warning')}`}></div>
              <span className="text-xs">Warning (26-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${getStatusBgColor('normal')}`}></div>
              <span className="text-xs">Normal (51-85%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${getStatusBgColor('excess')}`}></div>
              <span className="text-xs">Excess (86%+)</span>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}

