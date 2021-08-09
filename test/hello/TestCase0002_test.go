package test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/fayipon/go-gin/Router"

	"github.com/stretchr/testify/assert"
)

func TestCase0002(t *testing.T) {
	router := Router.Setup()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/hello", nil)

	router.ServeHTTP(w, req)

	// 是否 200
	assert.Equal(t, http.StatusOK, w.Code)
}
